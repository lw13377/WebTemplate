'use server'

import { createClient } from '@/lib/supabase/server'

export async function getFavoriteTemplateIds(): Promise<string[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('favorite_templates')
    .select('template_id')
    .eq('user_id', user.id)

  if (error) return []
  return data.map((row) => row.template_id)
}

export async function toggleFavoriteTemplate(templateId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data: existing } = await supabase
    .from('favorite_templates')
    .select('id')
    .eq('user_id', user.id)
    .eq('template_id', templateId)
    .single()

  if (existing) {
    await supabase
      .from('favorite_templates')
      .delete()
      .eq('id', existing.id)
    return false
  } else {
    await supabase
      .from('favorite_templates')
      .insert({ user_id: user.id, template_id: templateId })
    return true
  }
}
