import type { ResumeContent } from '@/types/resume'

export const SAMPLE_RESUME: ResumeContent = {
  personal: {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    linkedin: 'linkedin.com/in/alexjohnson',
  },
  summary:
    'Full-stack engineer with 6+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers.',
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description:
        'Led a team of 5 engineers to rebuild the core platform, improving performance by 40%. Designed and implemented microservices architecture serving 2M+ daily users.',
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      description:
        'Built real-time collaboration features using WebSockets. Reduced API response times by 60% through query optimization and caching strategies.',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2015',
      endDate: '2019',
      gpa: '3.8',
    },
  ],
  skills: [
    { id: '1', category: '', items: ['TypeScript', 'Python', 'Go', 'SQL', 'React', 'Next.js', 'Node.js', 'FastAPI', 'AWS', 'Docker', 'PostgreSQL', 'Redis'] },
  ],
  projects: [
    {
      id: '1',
      name: 'OpenBoard',
      description: 'Open-source kanban board with real-time sync',
      url: 'github.com/alex/openboard',
      technologies: ['React', 'Node.js', 'WebSocket'],
    },
  ],
  certifications: [
    { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2023' },
  ],
  languages: [
    { id: '1', language: 'English', proficiency: 'Native' },
    { id: '2', language: 'Spanish', proficiency: 'Conversational' },
  ],
}
