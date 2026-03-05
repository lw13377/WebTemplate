'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  href: string;
  highlighted: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Everything you need to build your first resume",
    features: [
      { text: "Build unlimited resumes" },
      { text: "Limited professional templates" },
      { text: "Live preview" },
      { text: "Color & font customization" },
    ],
    cta: "Start Free",
    href: "/editor/new",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$2",
    period: "/month",
    description: "Export and share your resumes with the world",
    features: [
      { text: "Everything in Free" },
      { text: "50+ professional templates" },
      { text: "Removes watermark" },
      { text: "PDF download" },
    ],
    cta: "Get Pro",
    href: "/login?redirect=/dashboard",
    highlighted: true,
  },
];

export function Pricing() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user))
  }, [])

  async function handleGetPro() {
    if (!isLoggedIn) {
      router.push('/login?redirect=/dashboard')
      return
    }
    setCheckoutLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error || 'Failed to start checkout')
        setCheckoutLoading(false)
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
      setCheckoutLoading(false)
    }
  }

  return (
    <section id="pricing" className="relative overflow-hidden py-20 sm:py-28 scroll-mt-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/3 via-transparent to-primary/3 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary/70">
            Pricing
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start for free. Upgrade when you need PDF exports.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2 sm:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary/30 bg-background shadow-2xl shadow-primary/10 scale-[1.02]"
                  : "border-border/50 bg-background shadow-sm hover:shadow-md"
              }`}
            >
              {/* Most Popular badge */}
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </Badge>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Divider */}
              <div className="mb-6 h-px bg-border" />

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      plan.highlighted ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-sm">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.highlighted ? (
                <Button
                  size="lg"
                  className="w-full h-12 font-semibold shadow-lg shadow-primary/25"
                  disabled={checkoutLoading}
                  onClick={handleGetPro}
                >
                  {checkoutLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Redirecting…
                    </>
                  ) : (
                    plan.cta
                  )}
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full h-12"
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
