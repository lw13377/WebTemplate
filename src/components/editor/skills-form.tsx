'use client'

import { useCallback, useMemo, useState, useRef, type KeyboardEvent } from 'react'
import { Lightbulb, Plus, Wrench, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useResume } from '@/hooks/use-resume'
import { getSkillsForJob } from '@/lib/suggestion-data'
import type { SkillCategory } from '@/types/resume'
import { CollapsibleSection } from './collapsible-section'

export function SkillsForm() {
  const { content, updateContent } = useResume()
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Flatten all skill categories into one flat list
  const allSkills = useMemo(
    () => content.skills.flatMap((s) => s.items),
    [content.skills]
  )

  const setSkills = useCallback(
    (items: string[]) => {
      const entry: SkillCategory = {
        id: content.skills[0]?.id || crypto.randomUUID(),
        category: '',
        items,
      }
      updateContent('skills', [entry])
    },
    [content.skills, updateContent]
  )

  // Migrate: flatten on first render if multiple categories exist
  useMemo(() => {
    if (content.skills.length > 1) {
      const flat = content.skills.flatMap((s) => s.items)
      const entry: SkillCategory = {
        id: content.skills[0].id,
        category: '',
        items: flat,
      }
      updateContent('skills', [entry])
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const addSkill = useCallback(
    (skill: string) => {
      const trimmed = skill.trim()
      if (!trimmed || allSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) return
      setSkills([...allSkills, trimmed])
    },
    [allSkills, setSkills]
  )

  const removeSkill = useCallback(
    (index: number) => {
      setSkills(allSkills.filter((_, i) => i !== index))
    },
    [allSkills, setSkills]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        addSkill(inputValue)
        setInputValue('')
      } else if (e.key === 'Backspace' && inputValue === '' && allSkills.length > 0) {
        removeSkill(allSkills.length - 1)
      }
    },
    [inputValue, addSkill, removeSkill, allSkills.length]
  )

  // Suggested skills from experience job titles
  const suggestedSkills = useMemo(() => {
    const existing = new Set(allSkills.map((s) => s.toLowerCase()))
    const suggested = new Set<string>()
    for (const exp of content.experience) {
      if (!exp.title) continue
      for (const skill of getSkillsForJob(exp.title)) {
        if (!existing.has(skill.toLowerCase())) {
          suggested.add(skill)
        }
      }
    }
    return Array.from(suggested)
  }, [content.experience, allSkills])

  return (
    <CollapsibleSection
      title="Skills"
      icon={<Wrench className="h-4 w-4" />}
    >
      <div className="space-y-3">
        {/* Tag input area */}
        <div
          className="flex min-h-[42px] flex-wrap items-center gap-1.5 rounded-md border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {allSkills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary transition-all animate-in fade-in slide-in-from-left-1 duration-200"
            >
              {skill}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeSkill(index)
                }}
                className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={allSkills.length === 0 ? 'Type a skill + Enter' : 'Add more...'}
            className="h-7 min-w-[120px] flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          />
        </div>

        {allSkills.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {allSkills.length} skill{allSkills.length !== 1 ? 's' : ''} added
          </p>
        )}
      </div>

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
                onClick={() => addSkill(skill)}
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
