import { ResumeContent } from './resume'

export interface Profile {
  id: string
  full_name: string | null
  email: string
  avatar_url: string | null
  is_subscribed: boolean
  subscription_expires_at: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  created_at: string
  updated_at: string
}

export interface ResumeRow {
  id: string
  user_id: string
  title: string
  template_id: string
  theme_color: string
  font_family: string
  content: ResumeContent
  created_at: string
  updated_at: string
}

export interface FavoriteTemplate {
  id: string
  user_id: string
  template_id: string
  created_at: string
}
