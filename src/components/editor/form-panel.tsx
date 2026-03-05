'use client'

import { useEffect, useState } from 'react'
import { Eye, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useResume } from '@/hooks/use-resume'
import { checkSubscription } from '@/lib/actions/subscription'
import { PersonalInfoForm } from './personal-info-form'
import { SummaryForm } from './summary-form'
import { ExperienceForm } from './experience-form'
import { EducationForm } from './education-form'
import { SkillsForm } from './skills-form'
import { ProjectsForm } from './projects-form'
import { CertificationsForm } from './certifications-form'
import { LanguagesForm } from './languages-form'

export function FormPanel({ onViewPreview }: { onViewPreview?: () => void }) {
  const { mode } = useResume()
  const [isSubscribed, setIsSubscribed] = useState(true)

  useEffect(() => {
    if (mode === 'guest') {
      setIsSubscribed(false)
    } else {
      checkSubscription().then(setIsSubscribed)
    }
  }, [mode])

  async function handleSubscribe() {
    if (mode === 'guest') {
      window.location.href = '/login'
      return
    }
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      toast.error('Failed to start checkout')
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-5 p-5 pb-24">
        {!isSubscribed && (
          <Button
            onClick={handleSubscribe}
            className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-md"
            size="lg"
          >
            <Sparkles className="h-4 w-4" />
            Subscribe to unlock all templates & PDF download
          </Button>
        )}
        <div>
          <h2 className="text-lg font-semibold">Resume Details</h2>
          <p className="text-sm text-muted-foreground">
            Fill in each section to build your resume.
          </p>
        </div>
        <PersonalInfoForm />
        <SummaryForm />
        <ExperienceForm />
        <EducationForm />
        <SkillsForm />
        <ProjectsForm />
        <CertificationsForm />
        <LanguagesForm />

        {/* Mobile: view preview button */}
        {onViewPreview && (
          <Button
            variant="outline"
            size="lg"
            className="w-full gap-2 md:hidden"
            onClick={onViewPreview}
          >
            <Eye className="h-4 w-4" />
            View Edited Resume
          </Button>
        )}
      </div>
    </div>
  )
}
