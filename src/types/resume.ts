export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  id: string
  degree: string
  school: string
  location: string
  startDate: string
  endDate: string
  gpa: string
}

export interface SkillCategory {
  id: string
  category: string
  items: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  url: string
  technologies: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
}

export interface Language {
  id: string
  language: string
  proficiency: string
}

export interface ResumeContent {
  personal: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: SkillCategory[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
}

export interface ResumeData {
  id: string
  title: string
  templateId: string
  themeColor: string
  fontFamily: string
  content: ResumeContent
}

export const DEFAULT_RESUME_CONTENT: ResumeContent = {
  personal: { name: '', email: '', phone: '', location: '', website: '', linkedin: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
}

export const FONT_OPTIONS = [
  'Inter', 'Roboto', 'Lato', 'Playfair Display', 'Merriweather',
  'Poppins', 'Open Sans', 'Raleway', 'Montserrat', 'Source Serif Pro',
]

export const COLOR_PRESETS = [
  '#1e3a5f', // Navy
  '#2563eb', // Blue
  '#3b82f6', // Light Blue
  '#64748b', // Steel Blue
  '#166534', // Forest Green
  '#059669', // Emerald
  '#0d9488', // Teal
  '#7f1d1d', // Burgundy
  '#dc2626', // Red
  '#ea580c', // Orange
  '#f97316', // Coral
  '#d97706', // Amber
  '#7c3aed', // Violet
  '#4f46e5', // Indigo
  '#e11d48', // Rose
  '#334155', // Charcoal
  '#78716c', // Warm Gray
  '#a8a29e', // Stone
  '#92400e', // Brown
  '#1e293b', // Dark Slate
]
