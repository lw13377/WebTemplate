export interface TemplateInfo {
  id: string
  name: string
  category: 'professional' | 'modern' | 'creative' | 'minimal'
  description: string
  isNew?: boolean
}

export const TEMPLATES: TemplateInfo[] = [
  // ── Professional (10) ──────────────────────────────────────────────────────
  { id: 'professional-classic', name: 'Classic', category: 'professional', description: 'Clean and traditional layout' },
  { id: 'professional-executive', name: 'Executive', category: 'professional', description: 'Polished executive style' },
  { id: 'professional-corporate', name: 'Corporate', category: 'professional', description: 'Corporate business format' },
  { id: 'professional-formal', name: 'Formal', category: 'professional', description: 'Formal document style' },
  { id: 'professional-traditional', name: 'Traditional', category: 'professional', description: 'Time-tested traditional layout' },
  { id: 'professional-diplomat', name: 'Diplomat', category: 'professional', description: 'Two-tone header with monogram initials', isNew: true },
  { id: 'professional-cornerstone', name: 'Cornerstone', category: 'professional', description: 'Corner accent bars, structured grid', isNew: true },
  { id: 'professional-chancellor', name: 'Chancellor', category: 'professional', description: 'Full-width dark header band', isNew: true },
  { id: 'professional-barrister', name: 'Barrister', category: 'professional', description: 'Serif emphasis, ruled lines', isNew: true },
  { id: 'professional-pinnacle', name: 'Pinnacle', category: 'professional', description: 'Centered header, accent triangle', isNew: true },

  // ── Modern (10) ────────────────────────────────────────────────────────────
  { id: 'modern-sleek', name: 'Sleek', category: 'modern', description: 'Sleek contemporary design' },
  { id: 'modern-gradient', name: 'Gradient', category: 'modern', description: 'Gradient accent header' },
  { id: 'modern-sidebar', name: 'Sidebar', category: 'modern', description: 'Sidebar layout with photo' },
  { id: 'modern-timeline', name: 'Timeline', category: 'modern', description: 'Timeline-based experience' },
  { id: 'modern-grid', name: 'Grid', category: 'modern', description: 'Grid-based modern layout' },
  { id: 'modern-metro', name: 'Metro', category: 'modern', description: 'Card-based sections with colored headers', isNew: true },
  { id: 'modern-neon', name: 'Neon', category: 'modern', description: 'Dark background, neon accent glows', isNew: true },
  { id: 'modern-wave', name: 'Wave', category: 'modern', description: 'Curved dividers between sections', isNew: true },
  { id: 'modern-split', name: 'Split', category: 'modern', description: '50/50 vertical split, colored info column', isNew: true },
  { id: 'modern-mosaic', name: 'Mosaic', category: 'modern', description: 'Alternating colored blocks', isNew: true },

  // ── Creative (15) ──────────────────────────────────────────────────────────
  { id: 'creative-vibrant', name: 'Vibrant', category: 'creative', description: 'Bold colors and shapes' },
  { id: 'creative-artistic', name: 'Artistic', category: 'creative', description: 'Artistic freeform layout' },
  { id: 'creative-bold', name: 'Bold', category: 'creative', description: 'Bold typography focus' },
  { id: 'creative-asymmetric', name: 'Asymmetric', category: 'creative', description: 'Asymmetric column layout' },
  { id: 'creative-portfolio', name: 'Portfolio', category: 'creative', description: 'Portfolio-style showcase' },
  { id: 'creative-infographic', name: 'Infographic', category: 'creative', description: 'Progress bars for skills, stat counters', isNew: true },
  { id: 'creative-magazine', name: 'Magazine', category: 'creative', description: 'Magazine layout with pull quotes', isNew: true },
  { id: 'creative-origami', name: 'Origami', category: 'creative', description: 'Geometric folded-paper accents', isNew: true },
  { id: 'creative-spectrum', name: 'Spectrum', category: 'creative', description: 'Rainbow gradient shifting across sections', isNew: true },
  { id: 'creative-stamp', name: 'Stamp', category: 'creative', description: 'Postcard aesthetic, dotted borders', isNew: true },
  { id: 'creative-blueprint', name: 'Blueprint', category: 'creative', description: 'Technical drawing grid, annotations', isNew: true },
  { id: 'creative-collage', name: 'Collage', category: 'creative', description: 'Overlapping card/sticky-note sections', isNew: true },
  { id: 'creative-neon-dark', name: 'Neon Dark', category: 'creative', description: 'Dark bg, bright neon borders', isNew: true },
  { id: 'creative-watercolor', name: 'Watercolor', category: 'creative', description: 'Soft gradient blobs as backgrounds', isNew: true },
  { id: 'creative-retro', name: 'Retro', category: 'creative', description: '1970s warm rounded shapes', isNew: true },

  // ── Minimal (15) ───────────────────────────────────────────────────────────
  { id: 'minimal-clean', name: 'Clean', category: 'minimal', description: 'Ultra-clean minimal' },
  { id: 'minimal-whitespace', name: 'Whitespace', category: 'minimal', description: 'Generous whitespace' },
  { id: 'minimal-simple', name: 'Simple', category: 'minimal', description: 'Simply elegant' },
  { id: 'minimal-elegant', name: 'Elegant', category: 'minimal', description: 'Refined elegance' },
  { id: 'minimal-refined', name: 'Refined', category: 'minimal', description: 'Sophisticated and refined' },
  { id: 'minimal-air', name: 'Air', category: 'minimal', description: 'Maximum whitespace, tiny elegant text', isNew: true },
  { id: 'minimal-line', name: 'Line', category: 'minimal', description: 'Single thin line as only decoration', isNew: true },
  { id: 'minimal-mono', name: 'Mono', category: 'minimal', description: 'Monochrome grayscale, typography hierarchy', isNew: true },
  { id: 'minimal-paper', name: 'Paper', category: 'minimal', description: 'Cream/warm tones, subtle depth', isNew: true },
  { id: 'minimal-zen', name: 'Zen', category: 'minimal', description: 'Japanese-inspired balanced asymmetry', isNew: true },
  { id: 'minimal-grid', name: 'Grid', category: 'minimal', description: 'Strict mathematical grid alignment', isNew: true },
  { id: 'minimal-type', name: 'Type', category: 'minimal', description: 'Font weight variation as decoration', isNew: true },
  { id: 'minimal-dot', name: 'Dot', category: 'minimal', description: 'Subtle dot-grid background', isNew: true },
  { id: 'minimal-edge', name: 'Edge', category: 'minimal', description: 'Content at edges, generous inner spacing', isNew: true },
  { id: 'minimal-swiss', name: 'Swiss', category: 'minimal', description: 'Swiss design: bold type, red accents', isNew: true },
]

export const TEMPLATE_CATEGORIES = ['professional', 'modern', 'creative', 'minimal'] as const
