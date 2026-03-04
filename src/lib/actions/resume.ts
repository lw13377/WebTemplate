'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DEFAULT_RESUME_CONTENT } from '@/types/resume'

export async function getResumes() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createResume() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data, error } = await supabase
    .from('resumes')
    .insert({ user_id: user.id, content: DEFAULT_RESUME_CONTENT })
    .select()
    .single()

  if (error) throw error
  redirect(`/editor/${data.id}`)
}

export async function deleteResume(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('resumes').delete().eq('id', id)
  if (error) throw error
}

export async function updateResumeTitle(id: string, title: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('resumes').update({ title }).eq('id', id)
  if (error) throw error
}
