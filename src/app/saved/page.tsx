import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/landing/footer'
import { SavedResumesList } from '@/components/saved/saved-resumes-list'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Saved Resumes | Resumes in Seconds',
  description: 'View and manage your saved resumes',
}

export default function SavedPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Saved Resumes
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            All your resumes in one place. Edit, download, or create new ones.
          </p>
        </div>
        <SavedResumesList />
      </main>
      <Footer />
    </div>
  )
}
