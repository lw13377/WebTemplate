'use client'

import { useCallback } from 'react'
import { Briefcase, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AutocompleteInput } from '@/components/ui/autocomplete-input'
import { SuggestionTextarea } from '@/components/ui/suggestion-textarea'
import { Label } from '@/components/ui/label'
import { useResume } from '@/hooks/use-resume'
import { US_CITIES, JOB_TITLES, getDescriptionBullets } from '@/lib/suggestion-data'
import type { Experience } from '@/types/resume'
import { CollapsibleSection } from './collapsible-section'

export function ExperienceForm() {
  const { content, updateContent } = useResume()
  const experiences = content.experience

  const addExperience = useCallback(() => {
    const newEntry: Experience = {
      id: crypto.randomUUID(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    }
    updateContent('experience', [...experiences, newEntry])
  }, [experiences, updateContent])

  const removeExperience = useCallback(
    (id: string) => {
      updateContent(
        'experience',
        experiences.filter((exp) => exp.id !== id)
      )
    },
    [experiences, updateContent]
  )

  const updateExperience = useCallback(
    (id: string, field: keyof Experience, value: string) => {
      updateContent(
        'experience',
        experiences.map((exp) =>
          exp.id === id ? { ...exp, [field]: value } : exp
        )
      )
    },
    [experiences, updateContent]
  )

  return (
    <CollapsibleSection
      title="Work Experience"
      icon={<Briefcase className="h-4 w-4" />}
    >
      {experiences.length === 0 ? (
        <div className="flex flex-col items-center rounded-lg border border-dashed py-8">
          <p className="mb-3 text-sm text-muted-foreground">
            No experience entries yet
          </p>
          <Button variant="outline" size="sm" onClick={addExperience}>
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative rounded-lg border bg-background p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Experience {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeExperience(exp.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Row 1: Title, Company, Location */}
              <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label>Job Title</Label>
                  <AutocompleteInput
                    value={exp.title}
                    onChange={(val) =>
                      updateExperience(exp.id, 'title', val)
                    }
                    suggestions={JOB_TITLES}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, 'company', e.target.value)
                    }
                    placeholder="Acme Inc."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Location</Label>
                  <AutocompleteInput
                    value={exp.location}
                    onChange={(val) =>
                      updateExperience(exp.id, 'location', val)
                    }
                    suggestions={US_CITIES}
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>

              {/* Row 2: Start Date, End Date */}
              <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Start Date</Label>
                  <Input
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, 'startDate', e.target.value)
                    }
                    placeholder="Jan 2022"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>End Date</Label>
                  <Input
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, 'endDate', e.target.value)
                    }
                    placeholder="Present"
                  />
                </div>
              </div>

              {/* Row 3: Description */}
              <div className="space-y-1.5">
                <Label>Description</Label>
                <SuggestionTextarea
                  value={exp.description}
                  onChange={(val) =>
                    updateExperience(exp.id, 'description', val)
                  }
                  suggestions={getDescriptionBullets(exp.title)}
                  placeholder="Describe your responsibilities, achievements, and impact..."
                  className="min-h-[80px]"
                  mode="append"
                  label="Suggested bullet points"
                />
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={addExperience}>
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        </div>
      )}
    </CollapsibleSection>
  )
}
