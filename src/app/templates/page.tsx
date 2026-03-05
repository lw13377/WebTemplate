import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/landing/footer'
import { TemplateGallery } from '@/components/templates/template-gallery'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Templates | ResumeForge',
  description: 'Browse 50 professionally designed resume templates across 4 categories',
}

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ select?: string }>
}) {
  const { select } = await searchParams
  const selectMode = select === 'true'

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {selectMode ? 'Choose a Template' : 'Resume Templates'}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {selectMode
              ? 'Pick a template to start your resume. You can always change it later.'
              : 'Choose from 50 professionally designed templates. Customize colors, fonts, and content to make it yours.'}
          </p>
        </div>
        <TemplateGallery />
      </main>
      <Footer />
    </div>
  )
}
