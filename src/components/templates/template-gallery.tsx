'use client'

import { useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { TEMPLATES, TEMPLATE_CATEGORIES, type TemplateInfo } from './template-registry'
import { TemplateRenderer } from './template-renderer'
import { SAMPLE_RESUME } from '@/lib/sample-data'
import { PAGE_WIDTH, PAGE_HEIGHT } from './base-styles'
import { createResume } from '@/lib/actions/resume'
import { createClient } from '@/lib/supabase/client'
import { checkSubscription } from '@/lib/actions/subscription'

const CATEGORY_LABELS: Record<string, string> = {
  professional: 'Professional',
  modern: 'Modern',
  creative: 'Creative',
  minimal: 'Minimal',
}

export function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)

  useEffect(() => {
    checkSubscription().then(setIsSubscribed)
  }, [])

  const filtered = (
    activeCategory === 'all'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeCategory)
  ).toSorted((a, b) => (a.premium ? 1 : 0) - (b.premium ? 1 : 0))

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
      <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} locked={!!template.premium && isSubscribed === false} />
        ))}
      </div>
    </div>
  )
}

function TemplateCard({ template, locked }: { template: TemplateInfo; locked: boolean }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const scale = 220 / PAGE_WIDTH // ~0.37

  function handleSelect() {
    if (locked) {
      toast.error('Subscribe to unlock premium templates', {
        description: 'This template is available with a Pro subscription.',
      })
      return
    }
    startTransition(async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        // Let guests use templates freely — no login required
        router.push(`/editor/new?template=${encodeURIComponent(template.id)}`)
        return
      }
      await createResume(template.id)
    })
  }

  return (
    <div className="group relative flex flex-col items-center">
      {/* Mini Preview */}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow group-hover:shadow-lg',
          locked && 'opacity-75'
        )}
        style={{ aspectRatio: `${PAGE_WIDTH} / ${PAGE_HEIGHT}` }}
      >
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: `scale(${scale})`,
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

        {/* Lock overlay for premium */}
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <Lock className="h-3 w-3" />
              Pro
            </div>
          </div>
        )}

        {/* Hover overlay (desktop) */}
        <div className="absolute inset-0 hidden items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100 md:flex">
          <Button
            size="sm"
            onClick={handleSelect}
            disabled={isPending}
          >
            {isPending ? 'Creating...' : locked ? 'Pro Only' : 'Use Template'}
          </Button>
        </div>
      </div>

      {/* Mobile-visible button below card */}
      <div className="mt-2 md:hidden">
        <Button
          size="sm"
          variant={locked ? 'outline' : 'default'}
          className="w-full"
          onClick={handleSelect}
          disabled={isPending}
        >
          {isPending ? 'Creating...' : locked ? 'Pro Only' : 'Use Template'}
        </Button>
      </div>

      {/* New / Pro badge */}
      {template.premium && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground shadow-sm">
          <Lock className="h-2.5 w-2.5" />
          Pro
        </div>
      )}
      {template.isNew && !template.premium && (
        <div className="absolute top-2 right-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-sm">
          New
        </div>
      )}

      {/* Info */}
      <div className="mt-3 w-full text-center sm:text-left">
        <h3 className="text-sm font-semibold">{template.name}</h3>
        <p className="text-xs text-muted-foreground">{template.description}</p>
      </div>
    </div>
  )
}
