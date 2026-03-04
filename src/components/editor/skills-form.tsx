'use client'

import { useCallback, useMemo } from 'react'
import { Lightbulb, Plus, Trash2, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResume } from '@/hooks/use-resume'
import { getSkillsForJob } from '@/lib/suggestion-data'
import type { SkillCategory } from '@/types/resume'
import { CollapsibleSection } from './collapsible-section'

export function SkillsForm() {
  const { content, updateContent } = useResume()
  const skills = content.skills

  const addSkill = useCallback(() => {
    const newEntry: SkillCategory = {
      id: crypto.randomUUID(),
      category: '',
      items: [],
    }
    updateContent('skills', [...skills, newEntry])
  }, [skills, updateContent])

  const removeSkill = useCallback(
    (id: string) => {
      updateContent(
        'skills',
        skills.filter((s) => s.id !== id)
      )
    },
    [skills, updateContent]
  )

  const updateSkillCategory = useCallback(
    (id: string, category: string) => {
      updateContent(
        'skills',
        skills.map((s) => (s.id === id ? { ...s, category } : s))
      )
    },
    [skills, updateContent]
  )

  const updateSkillItems = useCallback(
    (id: string, itemsStr: string) => {
      const items = itemsStr
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
      updateContent(
        'skills',
        skills.map((s) => (s.id === id ? { ...s, items } : s))
      )
    },
    [skills, updateContent]
  )

  // Compute suggested skills from all experience job titles
  const suggestedSkills = useMemo(() => {
    const allExisting = new Set(
      skills.flatMap((s) => s.items.map((i) => i.toLowerCase()))
    )
    const suggested = new Set<string>()
    for (const exp of content.experience) {
      if (!exp.title) continue
      for (const skill of getSkillsForJob(exp.title)) {
        if (!allExisting.has(skill.toLowerCase())) {
          suggested.add(skill)
        }
      }
    }
    return Array.from(suggested)
  }, [content.experience, skills])

  const addSuggestedSkill = useCallback(
    (skillName: string) => {
      if (skills.length === 0) {
        // Create a new category
        const newEntry: SkillCategory = {
          id: crypto.randomUUID(),
          category: 'Skills',
          items: [skillName],
        }
        updateContent('skills', [newEntry])
      } else {
        // Add to first category
        updateContent(
          'skills',
          skills.map((s, i) =>
            i === 0 ? { ...s, items: [...s.items, skillName] } : s
          )
        )
      }
    },
    [skills, updateContent]
  )

  return (
    <CollapsibleSection
      title="Skills"
      icon={<Wrench className="h-4 w-4" />}
    >
      {skills.length === 0 ? (
        <div className="flex flex-col items-center rounded-lg border border-dashed py-8">
          <p className="mb-3 text-sm text-muted-foreground">
            No skill categories yet
          </p>
          <Button variant="outline" size="sm" onClick={addSkill}>
            <Plus className="h-4 w-4" />
            Add Skill Category
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="relative rounded-lg border bg-background p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Category {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeSkill(skill.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Category Name</Label>
                  <Input
                    value={skill.category}
                    onChange={(e) =>
                      updateSkillCategory(skill.id, e.target.value)
                    }
                    placeholder="Programming Languages"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Skills (comma-separated)</Label>
                  <Input
                    value={skill.items.join(', ')}
                    onChange={(e) =>
                      updateSkillItems(skill.id, e.target.value)
                    }
                    placeholder="JavaScript, TypeScript, Python"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={addSkill}>
            <Plus className="h-4 w-4" />
            Add Skill Category
          </Button>
        </div>
      )}

      {/* Suggested Skills */}
      {suggestedSkills.length > 0 && (
        <div className="mt-4 rounded-md border bg-muted/30 p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5" />
            Suggested skills based on your experience
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSuggestedSkill(skill)}
                className="inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-1 text-xs font-medium transition-colors hover:bg-accent"
              >
                <Plus className="h-3 w-3" />
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </CollapsibleSection>
  )
}
