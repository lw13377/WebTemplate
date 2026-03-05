'use client'

import { useMemo, useState } from 'react'
import { AlignLeft, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { SuggestionTextarea } from '@/components/ui/suggestion-textarea'
import { useResume } from '@/hooks/use-resume'
import { getSummaryTemplates, estimateYearsOfExperience } from '@/lib/suggestion-data'
import { CollapsibleSection } from './collapsible-section'

const MAX_CHARS = 2000

export function SummaryForm() {
  const { content, updateContent } = useResume()
  const summary = content.summary
  const [dismissed, setDismissed] = useState(false)

  const firstJobTitle = content.experience[0]?.title || ''
  const templates = useMemo(
    () => getSummaryTemplates(firstJobTitle),
    [firstJobTitle]
  )

  // Auto-generated summary suggestion
  const autoSummary = useMemo(() => {
    if (!firstJobTitle || templates.length === 0) return null
    const years = estimateYearsOfExperience(content.experience)
    return templates[0]
      .replace(/\[X\]/g, years)
      .replace(/\[subject\/grade level\]/g, 'their field')
      .replace(/\[specialty\]/g, 'their specialty')
  }, [firstJobTitle, templates, content.experience])

  const showBanner = !summary && autoSummary && !dismissed

  return (
    <CollapsibleSection
      title="Professional Summary"
      icon={<AlignLeft className="h-4 w-4" />}
      defaultOpen
    >
      {/* Auto-summary banner */}
      {showBanner && (
        <div className="mb-3 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary mb-1">
              We wrote a summary for &ldquo;{firstJobTitle}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {autoSummary}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="default"
                className="h-7 text-xs"
                onClick={() => {
                  updateContent('summary', autoSummary!)
                  setDismissed(true)
                }}
              >
                Use This
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs"
                onClick={() => setDismissed(true)}
              >
                Dismiss
              </Button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

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
