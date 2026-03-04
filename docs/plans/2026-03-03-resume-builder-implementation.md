# Resume Builder Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a SaaS resume builder with 20 customizable templates, Supabase auth/database, and PDF download with a $2/mo paywall (Stripe stubbed).

**Architecture:** Monolithic Next.js 14 App Router application. Supabase handles auth and PostgreSQL database with RLS. Resume templates are React components that accept data/theme/font props. PDF generation via @react-pdf/renderer on server-side API routes. Auto-save with debounce.

**Tech Stack:** Next.js 14, Tailwind CSS, shadcn/ui, Supabase, @react-pdf/renderer, Google Fonts

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.js`, `tailwind.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `.env.local.example`, `.gitignore`

**Step 1: Initialize Next.js project**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

**Step 2: Install dependencies**

Run:
```bash
npm install @supabase/supabase-js @supabase/ssr @react-pdf/renderer lucide-react react-colorful date-fns
```

**Step 3: Initialize shadcn/ui**

Run:
```bash
npx shadcn@latest init -d
```

**Step 4: Add shadcn components we'll need**

Run:
```bash
npx shadcn@latest add button card input label textarea select tabs dialog dropdown-menu avatar badge separator sheet toast scroll-area tooltip
```

**Step 5: Create .env.local.example**

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Step 6: Create .env.local with actual Supabase credentials**

User must provide their Supabase project URL and anon key.

**Step 7: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind, shadcn/ui, and dependencies"
```

---

### Task 2: Supabase Client & Types

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/middleware.ts`
- Create: `src/types/database.ts`
- Create: `src/types/resume.ts`
- Create: `src/middleware.ts`

**Step 1: Create browser Supabase client**

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Step 2: Create server Supabase client**

```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — ignore
          }
        },
      },
    }
  )
}
```

**Step 3: Create middleware helper**

```typescript
// src/lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if accessing protected routes without auth
  if (!user && (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/editor'))) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
```

**Step 4: Create Next.js middleware**

```typescript
// src/middleware.ts
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

**Step 5: Create TypeScript types**

```typescript
// src/types/database.ts
export interface Profile {
  id: string
  full_name: string | null
  email: string
  avatar_url: string | null
  is_subscribed: boolean
  subscription_expires_at: string | null
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
```

```typescript
// src/types/resume.ts
export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  id: string
  degree: string
  school: string
  location: string
  startDate: string
  endDate: string
  gpa: string
}

export interface SkillCategory {
  id: string
  category: string
  items: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  url: string
  technologies: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
}

export interface Language {
  id: string
  language: string
  proficiency: string
}

export interface ResumeContent {
  personal: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: SkillCategory[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
}

export interface ResumeData {
  id: string
  title: string
  templateId: string
  themeColor: string
  fontFamily: string
  content: ResumeContent
}

export const DEFAULT_RESUME_CONTENT: ResumeContent = {
  personal: { name: '', email: '', phone: '', location: '', website: '', linkedin: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
}

export const FONT_OPTIONS = [
  'Inter', 'Roboto', 'Lato', 'Playfair Display', 'Merriweather',
  'Poppins', 'Open Sans', 'Raleway', 'Montserrat', 'Source Serif Pro',
]

export const COLOR_PRESETS = [
  '#2563eb', '#dc2626', '#059669', '#7c3aed', '#ea580c', '#0891b2',
  '#4f46e5', '#be185d', '#15803d', '#b45309', '#6366f1', '#334155',
]
```

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Supabase client setup, middleware, and TypeScript types"
```

---

### Task 3: Supabase Database Schema

**Files:**
- Create: `supabase/schema.sql`

**Step 1: Write SQL migration**

```sql
-- supabase/schema.sql
-- Run this in Supabase SQL Editor

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text not null,
  avatar_url text,
  is_subscribed boolean default false,
  subscription_expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Resumes table
create table public.resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text default 'Untitled Resume',
  template_id text default 'professional-classic',
  theme_color text default '#2563eb',
  font_family text default 'Inter',
  content jsonb default '{
    "personal": {"name": "", "email": "", "phone": "", "location": "", "website": "", "linkedin": ""},
    "summary": "",
    "experience": [],
    "education": [],
    "skills": [],
    "projects": [],
    "certifications": [],
    "languages": []
  }'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.resumes enable row level security;

-- Profiles policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Resumes policies
create policy "Users can view own resumes" on public.resumes
  for select using (auth.uid() = user_id);

create policy "Users can create own resumes" on public.resumes
  for insert with check (auth.uid() = user_id);

create policy "Users can update own resumes" on public.resumes
  for update using (auth.uid() = user_id);

create policy "Users can delete own resumes" on public.resumes
  for delete using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated_at trigger
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

create trigger resumes_updated_at
  before update on public.resumes
  for each row execute procedure public.update_updated_at();
```

**Step 2: User runs this SQL in their Supabase dashboard SQL Editor**

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Supabase database schema with RLS policies"
```

---

### Task 4: Auth Pages (Login / Signup)

**Files:**
- Create: `src/app/login/page.tsx`
- Create: `src/app/auth/callback/route.ts`

**Step 1: Create login/signup page**

Build a tabbed form with Login and Sign Up tabs. Uses Supabase auth `signInWithPassword` and `signUp`. On success, redirect to `/dashboard`.

**Step 2: Create auth callback route**

Handles the OAuth/email confirmation callback, exchanges code for session.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add login/signup page with Supabase auth"
```

---

### Task 5: Landing Page

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/landing/hero.tsx`
- Create: `src/components/landing/template-preview.tsx`
- Create: `src/components/landing/pricing.tsx`
- Create: `src/components/landing/footer.tsx`
- Create: `src/components/navbar.tsx`

**Step 1: Build Navbar**

Logo, nav links (Templates, Pricing), Login/Dashboard button (conditional on auth state).

**Step 2: Build Hero section**

Large headline ("Build Your Perfect Resume in Minutes"), subtext, CTA button to sign up, hero image/mockup of the editor.

**Step 3: Build Template Preview section**

Grid showing template thumbnails from all 4 categories with category tabs. Clicking goes to `/templates`.

**Step 4: Build Pricing section**

Simple pricing card: Free to build, $2/mo to download. Feature list.

**Step 5: Build Footer**

Simple footer with links and copyright.

**Step 6: Assemble landing page**

Compose all sections in `src/app/page.tsx`.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add landing page with hero, template preview, pricing, footer"
```

---

### Task 6: Dashboard Page

**Files:**
- Create: `src/app/dashboard/page.tsx`
- Create: `src/app/dashboard/layout.tsx`
- Create: `src/components/dashboard/resume-card.tsx`
- Create: `src/lib/actions/resume.ts`

**Step 1: Create server actions for resumes**

```typescript
// src/lib/actions/resume.ts
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
```

**Step 2: Build ResumeCard component**

Card showing resume title, template name, last updated date, edit/delete buttons.

**Step 3: Build Dashboard page**

Grid of ResumeCards + "Create New Resume" button. Shows empty state if no resumes.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add dashboard with resume CRUD operations"
```

---

### Task 7: Resume Editor — Layout & Form Sections

**Files:**
- Create: `src/app/editor/[id]/page.tsx`
- Create: `src/components/editor/editor-layout.tsx`
- Create: `src/components/editor/toolbar.tsx`
- Create: `src/components/editor/form-panel.tsx`
- Create: `src/components/editor/personal-info-form.tsx`
- Create: `src/components/editor/summary-form.tsx`
- Create: `src/components/editor/experience-form.tsx`
- Create: `src/components/editor/education-form.tsx`
- Create: `src/components/editor/skills-form.tsx`
- Create: `src/components/editor/projects-form.tsx`
- Create: `src/components/editor/certifications-form.tsx`
- Create: `src/components/editor/languages-form.tsx`
- Create: `src/hooks/use-resume.ts`
- Create: `src/context/resume-context.tsx`

**Step 1: Create ResumeContext**

React context that holds the current resume state (content, templateId, themeColor, fontFamily) and provides update functions. Includes debounced auto-save to Supabase.

**Step 2: Create useResume hook**

Hook that wraps the context for easy consumption.

**Step 3: Build Toolbar**

Top bar with: resume title (editable), template selector dropdown, color picker (react-colorful + presets), font selector dropdown, "Download PDF" button.

**Step 4: Build each form section**

Each form is a collapsible section with add/remove/reorder capabilities for array fields (experience, education, etc.):

- `personal-info-form.tsx` — Name, email, phone, location, website, LinkedIn fields
- `summary-form.tsx` — Textarea for professional summary
- `experience-form.tsx` — Add multiple jobs with title, company, location, dates, description
- `education-form.tsx` — Add multiple degrees with school, degree, dates, GPA
- `skills-form.tsx` — Add skill categories with comma-separated skills
- `projects-form.tsx` — Add projects with name, description, URL, technologies
- `certifications-form.tsx` — Add certs with name, issuer, date
- `languages-form.tsx` — Add languages with proficiency level

**Step 5: Build FormPanel**

Left panel that renders all form sections in a scrollable container with section tabs.

**Step 6: Build EditorLayout**

Split layout: FormPanel (left ~40%) + Preview panel placeholder (right ~60%) + Toolbar (top).

**Step 7: Build Editor page**

Server component that fetches resume data from Supabase, passes to client EditorLayout wrapped in ResumeContext.

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: add resume editor with form sections, context, and auto-save"
```

---

### Task 8: Template System & First 5 Templates (Professional)

**Files:**
- Create: `src/components/templates/template-registry.ts`
- Create: `src/components/templates/base-styles.ts`
- Create: `src/components/templates/professional/classic.tsx`
- Create: `src/components/templates/professional/executive.tsx`
- Create: `src/components/templates/professional/corporate.tsx`
- Create: `src/components/templates/professional/formal.tsx`
- Create: `src/components/templates/professional/traditional.tsx`

**Step 1: Create template registry**

```typescript
// src/components/templates/template-registry.ts
export interface TemplateInfo {
  id: string
  name: string
  category: 'professional' | 'modern' | 'creative' | 'minimal'
  description: string
  thumbnail: string // we'll use colored divs as placeholders
}

export const TEMPLATES: TemplateInfo[] = [
  // Professional
  { id: 'professional-classic', name: 'Classic', category: 'professional', description: 'Clean and traditional layout', thumbnail: '' },
  { id: 'professional-executive', name: 'Executive', category: 'professional', description: 'Polished executive style', thumbnail: '' },
  { id: 'professional-corporate', name: 'Corporate', category: 'professional', description: 'Corporate business format', thumbnail: '' },
  { id: 'professional-formal', name: 'Formal', category: 'professional', description: 'Formal document style', thumbnail: '' },
  { id: 'professional-traditional', name: 'Traditional', category: 'professional', description: 'Time-tested traditional layout', thumbnail: '' },
  // Modern
  { id: 'modern-sleek', name: 'Sleek', category: 'modern', description: 'Sleek contemporary design', thumbnail: '' },
  { id: 'modern-gradient', name: 'Gradient', category: 'modern', description: 'Gradient accent header', thumbnail: '' },
  { id: 'modern-sidebar', name: 'Sidebar', category: 'modern', description: 'Sidebar layout with photo', thumbnail: '' },
  { id: 'modern-timeline', name: 'Timeline', category: 'modern', description: 'Timeline-based experience', thumbnail: '' },
  { id: 'modern-grid', name: 'Grid', category: 'modern', description: 'Grid-based modern layout', thumbnail: '' },
  // Creative
  { id: 'creative-vibrant', name: 'Vibrant', category: 'creative', description: 'Bold colors and shapes', thumbnail: '' },
  { id: 'creative-artistic', name: 'Artistic', category: 'creative', description: 'Artistic freeform layout', thumbnail: '' },
  { id: 'creative-bold', name: 'Bold', category: 'creative', description: 'Bold typography focus', thumbnail: '' },
  { id: 'creative-asymmetric', name: 'Asymmetric', category: 'creative', description: 'Asymmetric column layout', thumbnail: '' },
  { id: 'creative-portfolio', name: 'Portfolio', category: 'creative', description: 'Portfolio-style showcase', thumbnail: '' },
  // Minimal
  { id: 'minimal-clean', name: 'Clean', category: 'minimal', description: 'Ultra-clean minimal', thumbnail: '' },
  { id: 'minimal-whitespace', name: 'Whitespace', category: 'minimal', description: 'Generous whitespace', thumbnail: '' },
  { id: 'minimal-simple', name: 'Simple', category: 'minimal', description: 'Simply elegant', thumbnail: '' },
  { id: 'minimal-elegant', name: 'Elegant', category: 'minimal', description: 'Refined elegance', thumbnail: '' },
  { id: 'minimal-refined', name: 'Refined', category: 'minimal', description: 'Sophisticated and refined', thumbnail: '' },
]
```

**Step 2: Create base template styles helper**

Utility functions for generating CSS classes based on themeColor and fontFamily.

**Step 3: Build 5 Professional templates**

Each template is a React component with signature:
```typescript
interface TemplateProps {
  content: ResumeContent
  themeColor: string
  fontFamily: string
}
```

Each renders a full-page resume layout (A4 proportions) using HTML/CSS. Templates differ in layout, typography, spacing, and use of themeColor.

- **Classic:** Traditional single-column, horizontal rules between sections
- **Executive:** Two-column header, name prominent, subtle color accents
- **Corporate:** Bold header bar with color, structured sections with icons
- **Formal:** Serif-inspired, centered header, formal section headings
- **Traditional:** Times-style, simple underlined headings, compact layout

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add template registry and 5 professional templates"
```

---

### Task 9: Modern Templates (5)

**Files:**
- Create: `src/components/templates/modern/sleek.tsx`
- Create: `src/components/templates/modern/gradient.tsx`
- Create: `src/components/templates/modern/sidebar.tsx`
- Create: `src/components/templates/modern/timeline.tsx`
- Create: `src/components/templates/modern/grid.tsx`

**Step 1: Build 5 Modern templates**

- **Sleek:** Clean lines, sans-serif, color-accented section dividers
- **Gradient:** Gradient header from themeColor to lighter shade, modern typography
- **Sidebar:** Left sidebar with personal info/skills/languages, main content right
- **Timeline:** Vertical timeline for experience/education, dots and lines
- **Grid:** CSS grid layout, skills in tag chips, structured blocks

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add 5 modern resume templates"
```

---

### Task 10: Creative Templates (5)

**Files:**
- Create: `src/components/templates/creative/vibrant.tsx`
- Create: `src/components/templates/creative/artistic.tsx`
- Create: `src/components/templates/creative/bold.tsx`
- Create: `src/components/templates/creative/asymmetric.tsx`
- Create: `src/components/templates/creative/portfolio.tsx`

**Step 1: Build 5 Creative templates**

- **Vibrant:** Large colored header, playful section backgrounds, rounded elements
- **Artistic:** Decorative borders, unique section markers, creative spacing
- **Bold:** Oversized section headings, strong typography hierarchy, color blocks
- **Asymmetric:** Left narrow + right wide columns, alternating section alignment
- **Portfolio:** Card-based sections, project-focused layout, visual emphasis

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add 5 creative resume templates"
```

---

### Task 11: Minimal Templates (5)

**Files:**
- Create: `src/components/templates/minimal/clean.tsx`
- Create: `src/components/templates/minimal/whitespace.tsx`
- Create: `src/components/templates/minimal/simple.tsx`
- Create: `src/components/templates/minimal/elegant.tsx`
- Create: `src/components/templates/minimal/refined.tsx`

**Step 1: Build 5 Minimal templates**

- **Clean:** Maximum whitespace, thin lines, minimal color (only name/headings)
- **Whitespace:** Extra spacing between all elements, airy feel
- **Simple:** No decorations at all, just clean typography and structure
- **Elegant:** Thin serif headings, subtle color line accents, refined spacing
- **Refined:** Small caps headings, hairline rules, sophisticated minimalism

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add 5 minimal resume templates"
```

---

### Task 12: Live Preview Component

**Files:**
- Create: `src/components/editor/preview-panel.tsx`
- Create: `src/components/templates/template-renderer.tsx`
- Modify: `src/components/editor/editor-layout.tsx`

**Step 1: Create TemplateRenderer**

Component that maps `templateId` to the correct template component and renders it with current resume data, themeColor, and fontFamily. Uses dynamic import or a switch/map.

**Step 2: Create PreviewPanel**

Right panel that wraps TemplateRenderer in a scaled-down A4 container with zoom controls. Shows the resume as it would appear on paper.

**Step 3: Wire into EditorLayout**

Replace preview placeholder with actual PreviewPanel.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add live preview panel with template rendering"
```

---

### Task 13: Template Gallery Page

**Files:**
- Create: `src/app/templates/page.tsx`
- Create: `src/components/templates/template-gallery.tsx`

**Step 1: Build TemplateGallery component**

Grid view of all 20 templates with:
- Category filter tabs (All, Professional, Modern, Creative, Minimal)
- Each template shown as a mini preview card with sample data
- Click to select / "Use this template" button → redirects to signup or creates resume

**Step 2: Build Templates page**

Public page (no auth required) showing the gallery. Marketing-focused with CTA.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add public template gallery page"
```

---

### Task 14: PDF Generation

**Files:**
- Create: `src/app/api/resume/download/route.ts`
- Create: `src/components/pdf/pdf-templates.tsx`
- Create: `src/components/pdf/pdf-registry.ts`

**Step 1: Create PDF template components**

Re-implement templates using @react-pdf/renderer primitives (`Document`, `Page`, `View`, `Text`, `StyleSheet`). These mirror the HTML templates but use react-pdf's API.

Note: Due to react-pdf limitations, these will be simplified versions of the HTML templates but maintain the same overall look and structure.

**Step 2: Create PDF registry**

Maps templateId to the correct PDF template component.

**Step 3: Create download API route**

```typescript
// src/app/api/resume/download/route.ts
import { createClient } from '@/lib/supabase/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const resumeId = searchParams.get('id')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Check subscription (stubbed — bypass for now)
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_subscribed')
    .eq('id', user.id)
    .single()

  // TODO: Uncomment when Stripe is ready
  // if (!profile?.is_subscribed) {
  //   return NextResponse.json({ error: 'Subscription required' }, { status: 403 })
  // }

  const { data: resume } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', resumeId)
    .single()

  if (!resume) return NextResponse.json({ error: 'Resume not found' }, { status: 404 })

  // Generate PDF
  const PdfTemplate = getPdfTemplate(resume.template_id)
  const buffer = await renderToBuffer(
    <PdfTemplate content={resume.content} themeColor={resume.theme_color} fontFamily={resume.font_family} />
  )

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${resume.title || 'resume'}.pdf"`,
    },
  })
}
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add PDF generation API route with react-pdf templates"
```

---

### Task 15: Payment Gate (Stubbed)

**Files:**
- Create: `src/components/editor/download-modal.tsx`
- Create: `src/lib/actions/subscription.ts`

**Step 1: Create subscription actions**

```typescript
// src/lib/actions/subscription.ts
'use server'

import { createClient } from '@/lib/supabase/server'

export async function checkSubscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_subscribed, subscription_expires_at')
    .eq('id', user.id)
    .single()

  if (!profile) return false
  if (!profile.is_subscribed) return false
  if (profile.subscription_expires_at && new Date(profile.subscription_expires_at) < new Date()) return false
  return true
}

// DEV ONLY: Bypass payment for testing
export async function activateDevSubscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('profiles')
    .update({
      is_subscribed: true,
      subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    })
    .eq('id', user.id)
}
```

**Step 2: Create DownloadModal**

Modal that appears when user clicks "Download PDF":
- If subscribed: directly triggers download
- If not subscribed: shows pricing info ($2/mo), Stripe button placeholder, and a DEV bypass button that calls `activateDevSubscription()` then triggers download

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add payment gate modal with dev bypass for PDF downloads"
```

---

### Task 16: Polish & Final Integration

**Files:**
- Modify: `src/app/layout.tsx` — Add Google Fonts, meta tags, toast provider
- Modify: `src/app/globals.css` — Final global styles
- Create: `src/components/ui/loading.tsx` — Loading spinner component
- Modify: Various files for polish

**Step 1: Add Google Fonts**

Import all 10 font families via `next/font/google` in the root layout.

**Step 2: Add meta tags**

Title: "ResumeForge — Build Professional Resumes in Minutes"
Description, Open Graph tags.

**Step 3: Add loading states**

Loading spinners for dashboard, editor, and PDF generation.

**Step 4: Add toast notifications**

Success/error toasts for save, delete, download operations.

**Step 5: Test full flow**

1. Visit landing page
2. Sign up
3. Create resume
4. Fill in all sections
5. Switch templates, change colors, change fonts
6. Click download → see payment modal → bypass → get PDF

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: polish UI with fonts, loading states, and toast notifications"
```
