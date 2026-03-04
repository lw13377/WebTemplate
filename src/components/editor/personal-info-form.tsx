'use client'

import { useCallback } from 'react'
import { User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { AutocompleteInput } from '@/components/ui/autocomplete-input'
import { Label } from '@/components/ui/label'
import { useResume } from '@/hooks/use-resume'
import { US_CITIES } from '@/lib/suggestion-data'
import type { PersonalInfo } from '@/types/resume'
import { CollapsibleSection } from './collapsible-section'

export function PersonalInfoForm() {
  const { content, updateContent } = useResume()
  const personal = content.personal

  const update = useCallback(
    (field: keyof PersonalInfo, value: string) => {
      updateContent('personal', { ...personal, [field]: value })
    },
    [personal, updateContent]
  )

  return (
    <CollapsibleSection
      title="Personal Information"
      icon={<User className="h-4 w-4" />}
      defaultOpen
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={personal.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={personal.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={personal.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <AutocompleteInput
            id="location"
            value={personal.location}
            onChange={(val) => update('location', val)}
            suggestions={US_CITIES}
            placeholder="New York, NY"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={personal.website}
            onChange={(e) => update('website', e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            type="url"
            value={personal.linkedin}
            onChange={(e) => update('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
      </div>
    </CollapsibleSection>
  )
}
