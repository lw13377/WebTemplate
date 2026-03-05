'use client'

import { useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Clock, Edit, FileText, Loader2, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useResume } from '@/hooks/use-resume'
import { deleteResume } from '@/lib/actions/resume'
import type { ResumeRow } from '@/types/database'

const TEMPLATE_LABELS: Record<string, string> = {
  professional: 'Professional',
  modern: 'Modern',
  creative: 'Creative',
  minimal: 'Minimal',
}

export function SavedResumesPanel() {
  const { mode } = useResume()
  const [resumes, setResumes] = useState<ResumeRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (mode === 'guest') {
      setLoading(false)
      return
    }
    fetch('/api/resume/list')
      .then((r) => r.json())
      .then((data) => setResumes(data.resumes || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [mode])

  if (mode === 'guest') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <FileText className="h-10 w-10 text-muted-foreground/40" />
        <div>
          <p className="font-medium">Sign in to save resumes</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a free account to save your progress and access your resumes anytime.
          </p>
        </div>
        <Button asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 border-b px-3 py-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Saved Resumes
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <FileText className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No saved resumes yet</p>
            <p className="text-xs text-muted-foreground">
              Click &quot;Save Progress&quot; to save your current resume.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {resumes.map((resume) => (
              <SavedResumeItem
                key={resume.id}
                resume={resume}
                onDeleted={(id) => setResumes((r) => r.filter((x) => x.id !== id))}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 border-t p-3">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/templates?select=true">
            <Plus className="h-4 w-4" />
            Create New Resume
          </Link>
        </Button>
      </div>
    </div>
  )
}

function SavedResumeItem({
  resume,
  onDeleted,
}: {
  resume: ResumeRow
  onDeleted: (id: string) => void
}) {
  const [isPending, startTransition] = useTransition()
  const category = resume.template_id.split('-')[0] || 'professional'
  const label = TEMPLATE_LABELS[category] || 'Professional'

  function handleDelete() {
    startTransition(async () => {
      await deleteResume(resume.id)
      onDeleted(resume.id)
    })
  }

  return (
    <div className="group flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
        <FileText className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{resume.title}</p>
        <div className="mt-1 flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            {label}
          </Badge>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="h-2.5 w-2.5" />
            {formatDistanceToNow(new Date(resume.updated_at), { addSuffix: true })}
          </span>
        </div>
        <div className="mt-2 flex gap-1.5">
          <Button size="sm" variant="default" className="h-7 text-xs" asChild>
            <Link href={`/editor/${resume.id}`}>
              <Edit className="h-3 w-3" />
              Edit
            </Link>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs text-destructive hover:text-destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash2 className="h-3 w-3" />
            {isPending ? '...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  )
}
