'use client'

import { useMemo } from 'react'
import { AlignLeft } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { SuggestionTextarea } from '@/components/ui/suggestion-textarea'
import { useResume } from '@/hooks/use-resume'
import { getSummaryTemplates } from '@/lib/suggestion-data'
import { CollapsibleSection } from './collapsible-section'

const MAX_CHARS = 2000

export function SummaryForm() {
  const { content, updateContent } = useResume()
  const summary = content.summary

  const firstJobTitle = content.experience[0]?.title || ''
  const templates = useMemo(
    () => getSummaryTemplates(firstJobTitle),
    [firstJobTitle]
  )

  return (
    <CollapsibleSection
      title="Professional Summary"
      icon={<AlignLeft className="h-4 w-4" />}
      defaultOpen
    >
      <div className="space-y-1.5">
        <Label htmlFor="summary">Summary</Label>
        <SuggestionTextarea
          value={summary}
          onChange={(val) => updateContent('summary', val)}
          suggestions={templates}
          placeholder="A brief summary of your professional background, key skills, and career goals..."
          className="min-h-[120px]"
          maxChars={MAX_CHARS}
          mode="replace"
          label="Summary templates"
        />
      </div>
    </CollapsibleSection>
  )
}
