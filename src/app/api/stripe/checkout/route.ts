import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function POST() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get profile to check for existing Stripe customer and subscription
    const { data: profile } = await getSupabaseAdmin()
      .from('profiles')
      .select('stripe_customer_id, is_subscribed, subscription_expires_at')
      .eq('id', user.id)
      .single()

    // Already subscribed — don't create a new checkout
    if (
      profile?.is_subscribed &&
      (!profile.subscription_expires_at ||
        new Date(profile.subscription_expires_at) > new Date())
    ) {
      return NextResponse.json(
        { error: 'You already have an active subscription' },
        { status: 400 },
      )
    }

    let customerId = profile?.stripe_customer_id

    // Create Stripe customer if needed
    if (!customerId) {
      const customer = await getStripe().customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id

      await getSupabaseAdmin()
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Create Checkout Session
    const session = await getStripe().checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      ...(process.env.STRIPE_INTRO_COUPON_ID && {
        discounts: [{ coupon: process.env.STRIPE_INTRO_COUPON_ID }],
      }),
      success_url: `${appUrl}/dashboard?subscription=success`,
      cancel_url: `${appUrl}/dashboard?subscription=cancelled`,
      metadata: { supabase_user_id: user.id },
      subscription_data: {
        metadata: { supabase_user_id: user.id },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 },
    )
  }
}
