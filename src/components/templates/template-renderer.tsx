'use client'

import dynamic from 'next/dynamic'
import type { TemplateProps } from './base-styles'

// Dynamic imports for all 50 templates
const templates: Record<string, React.ComponentType<TemplateProps>> = {}

const templateImports: Record<string, () => Promise<{ default: React.ComponentType<TemplateProps> }>> = {
  // Professional (10)
  'professional-classic': () => import('./professional/classic'),
  'professional-executive': () => import('./professional/executive'),
  'professional-corporate': () => import('./professional/corporate'),
  'professional-formal': () => import('./professional/formal'),
  'professional-traditional': () => import('./professional/traditional'),
  'professional-diplomat': () => import('./professional/diplomat'),
  'professional-cornerstone': () => import('./professional/cornerstone'),
  'professional-chancellor': () => import('./professional/chancellor'),
  'professional-barrister': () => import('./professional/barrister'),
  'professional-pinnacle': () => import('./professional/pinnacle'),

  // Modern (10)
  'modern-sleek': () => import('./modern/sleek'),
  'modern-gradient': () => import('./modern/gradient'),
  'modern-sidebar': () => import('./modern/sidebar'),
  'modern-timeline': () => import('./modern/timeline'),
  'modern-grid': () => import('./modern/grid'),
  'modern-metro': () => import('./modern/metro'),
  'modern-neon': () => import('./modern/neon'),
  'modern-wave': () => import('./modern/wave'),
  'modern-split': () => import('./modern/split'),
  'modern-mosaic': () => import('./modern/mosaic'),

  // Creative (15)
  'creative-vibrant': () => import('./creative/vibrant'),
  'creative-artistic': () => import('./creative/artistic'),
  'creative-bold': () => import('./creative/bold'),
  'creative-asymmetric': () => import('./creative/asymmetric'),
  'creative-portfolio': () => import('./creative/portfolio'),
  'creative-infographic': () => import('./creative/infographic'),
  'creative-magazine': () => import('./creative/magazine'),
  'creative-origami': () => import('./creative/origami'),
  'creative-spectrum': () => import('./creative/spectrum'),
  'creative-stamp': () => import('./creative/stamp'),
  'creative-blueprint': () => import('./creative/blueprint'),
  'creative-collage': () => import('./creative/collage'),
  'creative-neon-dark': () => import('./creative/neon-dark'),
  'creative-watercolor': () => import('./creative/watercolor'),
  'creative-retro': () => import('./creative/retro'),

  // Minimal (15)
  'minimal-clean': () => import('./minimal/clean'),
  'minimal-whitespace': () => import('./minimal/whitespace'),
  'minimal-simple': () => import('./minimal/simple'),
  'minimal-elegant': () => import('./minimal/elegant'),
  'minimal-refined': () => import('./minimal/refined'),
  'minimal-air': () => import('./minimal/air'),
  'minimal-line': () => import('./minimal/line'),
  'minimal-mono': () => import('./minimal/mono'),
  'minimal-paper': () => import('./minimal/paper'),
  'minimal-zen': () => import('./minimal/zen'),
  'minimal-grid': () => import('./minimal/grid'),
  'minimal-type': () => import('./minimal/type'),
  'minimal-dot': () => import('./minimal/dot'),
  'minimal-edge': () => import('./minimal/edge'),
  'minimal-swiss': () => import('./minimal/swiss'),
}

// Create dynamic components for each template
for (const [id, importFn] of Object.entries(templateImports)) {
  templates[id] = dynamic(importFn, { ssr: false })
}

interface TemplateRendererProps extends TemplateProps {
  templateId: string
}

export function TemplateRenderer({ templateId, content, themeColor, fontFamily }: TemplateRendererProps) {
  const Template = templates[templateId] || templates['professional-classic']

  return <Template content={content} themeColor={themeColor} fontFamily={fontFamily} />
}
