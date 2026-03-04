import { Plus, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ResumeCard } from '@/components/dashboard/resume-card'
import { getResumes, createResume } from '@/lib/actions/resume'
import { createClient } from '@/lib/supabase/server'
import type { ResumeRow } from '@/types/database'

export const metadata = {
  title: 'Dashboard | ResumeForge',
  description: 'Manage your resumes',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const resumes = (await getResumes()) as ResumeRow[]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Resumes</h1>
          {user?.email && (
            <p className="mt-1 text-sm text-muted-foreground">
              {user.user_metadata?.full_name || user.email}
            </p>
          )}
        </div>
        <form action={createResume}>
          <Button type="submit" size="default">
            <Plus className="h-4 w-4" />
            Create New Resume
          </Button>
        </form>
      </div>

      <Separator />

      {/* Resume Grid or Empty State */}
      {resumes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">No resumes yet</h2>
          <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
            Create your first resume to get started. Choose from professional
            templates and customize it to stand out.
          </p>
          <form action={createResume} className="mt-6">
            <Button type="submit">
              <Plus className="h-4 w-4" />
              Create Your First Resume
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
