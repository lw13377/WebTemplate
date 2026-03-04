'use client'

import { useCallback } from 'react'
import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AutocompleteInput } from '@/components/ui/autocomplete-input'
import { Label } from '@/components/ui/label'
import { useResume } from '@/hooks/use-resume'
import { US_CITIES } from '@/lib/suggestion-data'
import type { Education } from '@/types/resume'
import { CollapsibleSection } from './collapsible-section'

export function EducationForm() {
  const { content, updateContent } = useResume()
  const educations = content.education

  const addEducation = useCallback(() => {
    const newEntry: Education = {
      id: crypto.randomUUID(),
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
    }
    updateContent('education', [...educations, newEntry])
  }, [educations, updateContent])

  const removeEducation = useCallback(
    (id: string) => {
      updateContent(
        'education',
        educations.filter((edu) => edu.id !== id)
      )
    },
    [educations, updateContent]
  )

  const updateEducation = useCallback(
    (id: string, field: keyof Education, value: string) => {
      updateContent(
        'education',
        educations.map((edu) =>
          edu.id === id ? { ...edu, [field]: value } : edu
        )
      )
    },
    [educations, updateContent]
  )

  return (
    <CollapsibleSection
      title="Education"
      icon={<GraduationCap className="h-4 w-4" />}
    >
      {educations.length === 0 ? (
        <div className="flex flex-col items-center rounded-lg border border-dashed py-8">
          <p className="mb-3 text-sm text-muted-foreground">
            No education entries yet
          </p>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="h-4 w-4" />
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu, index) => (
            <div
              key={edu.id}
              className="relative rounded-lg border bg-background p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Education {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeEducation(edu.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Row 1: Degree, School, Location */}
              <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, 'degree', e.target.value)
                    }
                    placeholder="B.S. Computer Science"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>School</Label>
                  <Input
                    value={edu.school}
                    onChange={(e) =>
                      updateEducation(edu.id, 'school', e.target.value)
                    }
                    placeholder="MIT"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Location</Label>
                  <AutocompleteInput
                    value={edu.location}
                    onChange={(val) =>
                      updateEducation(edu.id, 'location', val)
                    }
                    suggestions={US_CITIES}
                    placeholder="Cambridge, MA"
                  />
                </div>
              </div>

              {/* Row 2: Start Date, End Date, GPA */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label>Start Date</Label>
                  <Input
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, 'startDate', e.target.value)
                    }
                    placeholder="Sep 2018"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>End Date</Label>
                  <Input
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, 'endDate', e.target.value)
                    }
                    placeholder="Jun 2022"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>GPA</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) =>
                      updateEducation(edu.id, 'gpa', e.target.value)
                    }
                    placeholder="3.8 / 4.0"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="h-4 w-4" />
            Add Education
          </Button>
        </div>
      )}
    </CollapsibleSection>
  )
}
