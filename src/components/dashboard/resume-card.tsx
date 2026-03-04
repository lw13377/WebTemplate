'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { FileText, Edit, Trash2, Clock, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteResume } from '@/lib/actions/resume'
import type { ResumeRow } from '@/types/database'

const TEMPLATE_COLORS: Record<string, { bg: string; label: string }> = {
  professional: { bg: 'bg-blue-500/10', label: 'Professional' },
  modern: { bg: 'bg-violet-500/10', label: 'Modern' },
  creative: { bg: 'bg-rose-500/10', label: 'Creative' },
  minimal: { bg: 'bg-slate-500/10', label: 'Minimal' },
}

function getTemplateInfo(templateId: string) {
  const category = templateId.split('-')[0] || 'professional'
  return TEMPLATE_COLORS[category] || TEMPLATE_COLORS.professional
}

export function ResumeCard({ resume }: { resume: ResumeRow }) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const templateInfo = getTemplateInfo(resume.template_id)
  const updatedAt = formatDistanceToNow(new Date(resume.updated_at), {
    addSuffix: true,
  })

  function handleDelete() {
    startTransition(async () => {
      await deleteResume(resume.id)
      setDeleteOpen(false)
    })
  }

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md">
      {/* Mini Preview Area */}
      <div
        className={`relative flex h-40 items-center justify-center ${templateInfo.bg}`}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
          <FileText className="h-10 w-10" />
          <span className="text-xs font-medium">Resume Preview</span>
        </div>

        {/* Decorative lines simulating resume content */}
        <div className="absolute inset-4 flex flex-col gap-1.5 opacity-20">
          <div className="h-2 w-1/2 rounded-full bg-foreground" />
          <div className="h-1.5 w-3/4 rounded-full bg-foreground" />
          <div className="h-1.5 w-2/3 rounded-full bg-foreground" />
          <div className="mt-2 h-1 w-full rounded-full bg-foreground" />
          <div className="h-1 w-full rounded-full bg-foreground" />
          <div className="h-1 w-4/5 rounded-full bg-foreground" />
          <div className="mt-2 h-1 w-full rounded-full bg-foreground" />
          <div className="h-1 w-3/4 rounded-full bg-foreground" />
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/5 group-hover:opacity-100">
          <Button size="sm" asChild>
            <Link href={`/editor/${resume.id}`}>
              <Edit className="h-3.5 w-3.5" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1 text-base">
            {resume.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/editor/${resume.id}`}>
                  <Edit className="mr-2 h-3.5 w-3.5" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onSelect={() => setDeleteOpen(true)}
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <Badge variant="secondary" className="text-xs">
          {templateInfo.label}
        </Badge>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">
        <Clock className="mr-1.5 h-3 w-3" />
        Updated {updatedAt}
      </CardFooter>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Resume</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{resume.title}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
