# Resume Builder — Design Document

## Overview

A SaaS resume builder where users create resumes using 20 customizable templates, then pay $2/month to download PDFs. Built as a monolithic Next.js app with Supabase for auth/database and Stripe for payments (stubbed initially).

## User Flow

1. Landing page — hero, template gallery preview, pricing, CTA
2. Sign up / Login via Supabase (email + password)
3. Dashboard — view saved resumes, create new
4. Resume Editor — form-based sections (left) + live preview (right) + template/color/font selector (top)
5. Download — paywall check → pay $2/mo → get PDF

## Pages

- `/` — Landing page with hero, template preview, pricing
- `/login` — Sign in / Sign up
- `/dashboard` — User's saved resumes
- `/editor/[id]` — Resume editor (form + live preview)
- `/templates` — Browse all 20 templates (marketing)

## Database Schema (Supabase PostgreSQL)

### profiles
- `id` UUID (PK, FK to auth.users)
- `full_name` text
- `email` text
- `avatar_url` text
- `is_subscribed` boolean (default false)
- `subscription_expires_at` timestamptz
- `created_at` timestamptz
- `updated_at` timestamptz

### resumes
- `id` UUID (PK)
- `user_id` UUID (FK to profiles)
- `title` text
- `template_id` text
- `theme_color` text (hex)
- `font_family` text
- `content` JSONB (all resume sections)
- `created_at` timestamptz
- `updated_at` timestamptz

### Resume content JSONB structure
```json
{
  "personal": { "name", "email", "phone", "location", "website", "linkedin" },
  "summary": "...",
  "experience": [{ "title", "company", "location", "startDate", "endDate", "description" }],
  "education": [{ "degree", "school", "location", "startDate", "endDate", "gpa" }],
  "skills": [{ "category", "items" }],
  "projects": [{ "name", "description", "url", "technologies" }],
  "certifications": [{ "name", "issuer", "date" }],
  "languages": [{ "language", "proficiency" }]
}
```

## Templates (20 total, 4 categories)

- **Professional (5):** Classic, Executive, Corporate, Formal, Traditional
- **Modern (5):** Sleek, Gradient, Sidebar, Timeline, Grid
- **Creative (5):** Vibrant, Artistic, Bold, Asymmetric, Portfolio
- **Minimal (5):** Clean, Whitespace, Simple, Elegant, Refined

## Customization

- **Colors:** 12 preset colors + custom color picker
- **Fonts:** Inter, Roboto, Lato, Playfair Display, Merriweather, Poppins, Open Sans, Raleway, Montserrat, Source Serif Pro

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | Supabase Auth (email/password) |
| Database | Supabase PostgreSQL |
| PDF Generation | @react-pdf/renderer |
| Fonts | Google Fonts |
| Deployment | Vercel |
| Payments | Stripe (stubbed — bypass button for now) |

## Key Decisions

- Auto-save resume data to Supabase (debounced)
- Templates are React components receiving resume data + theme + font as props
- Row Level Security on Supabase (users access only their own data)
- Server-side PDF generation via API route
- No AI features, no import/parsing, no sharing, no teams, no i18n

## Payment Model

- $2/month subscription
- Free to build and preview resumes
- Paywall on PDF download
- Stripe integration added later; bypass button for development
