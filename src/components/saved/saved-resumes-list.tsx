'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ResumeCard } from '@/components/dashboard/resume-card'
import { getResumes } from '@/lib/actions/resume'
import type { ResumeRow } from '@/types/database'

export function SavedResumesList() {
  const [resumes, setResumes] = useState<ResumeRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getResumes()
      .then(setResumes)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (resumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">No saved resumes</h2>
        <p className="mt-2 text-muted-foreground max-w-sm">
          You haven&apos;t created any resumes yet. Browse our templates to get started.
        </p>
        <Button asChild className="mt-6">
          <Link href="/templates">Browse Templates</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  )
}
