import type { SkillCategory, PersonalInfo } from '@/types/resume'

/** Flatten all skill categories into a single array of skill strings */
export function getAllSkills(skills: SkillCategory[]): string[] {
  return skills.flatMap((s) => s.items)
}

/** Build a contact info line from personal info fields */
export function renderContactLine(personal: PersonalInfo): string[] {
  const parts: string[] = []
  if (personal.email) parts.push(personal.email)
  if (personal.phone) parts.push(personal.phone)
  if (personal.location) parts.push(personal.location)
  if (personal.website) parts.push(personal.website)
  if (personal.linkedin) parts.push(personal.linkedin)
  return parts
}

/** Format a date range string */
export function formatDateRange(startDate: string, endDate: string): string {
  if (startDate && endDate) return `${startDate} - ${endDate}`
  if (startDate) return startDate
  if (endDate) return endDate
  return ''
}
