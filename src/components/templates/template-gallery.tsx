'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TEMPLATES, TEMPLATE_CATEGORIES, type TemplateInfo } from './template-registry'
import { TemplateRenderer } from './template-renderer'
import { SAMPLE_RESUME } from '@/lib/sample-data'
import { PAGE_WIDTH, PAGE_HEIGHT } from './base-styles'

const CATEGORY_LABELS: Record<string, string> = {
  professional: 'Professional',
  modern: 'Modern',
  creative: 'Creative',
  minimal: 'Minimal',
}

export function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const router = useRouter()

  const filtered =
    activeCategory === 'all'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeCategory)

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('all')}
          className={cn(
            'rounded-full px-5 py-2 text-sm font-medium transition-colors',
            activeCategory === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:text-foreground'
          )}
        >
          All ({TEMPLATES.length})
        </button>
        {TEMPLATE_CATEGORIES.map((cat) => {
          const count = TEMPLATES.filter((t) => t.category === cat).length
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              {CATEGORY_LABELS[cat]} ({count})
            </button>
          )
        })}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  )
}

function TemplateCard({ template }: { template: TemplateInfo }) {
  const router = useRouter()
  const scale = 220 / PAGE_WIDTH

  return (
    <div className="group flex flex-col">
      {/* Mini Preview */}
      <div
        className="relative overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow group-hover:shadow-lg"
        style={{ height: `${PAGE_HEIGHT * scale + 8}px` }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${PAGE_WIDTH}px`,
            height: `${PAGE_HEIGHT}px`,
            pointerEvents: 'none',
          }}
        >
          <TemplateRenderer
            templateId={template.id}
            content={SAMPLE_RESUME}
            themeColor="#2563eb"
            fontFamily="Inter"
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
          <Button
            size="sm"
            onClick={() => router.push('/login')}
          >
            Use Template
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="text-sm font-semibold">{template.name}</h3>
        <p className="text-xs text-muted-foreground">{template.description}</p>
      </div>
    </div>
  )
}
