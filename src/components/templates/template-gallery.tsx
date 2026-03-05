'use client'

import { useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Heart } from 'lucide-react'
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
import { getFavoriteTemplateIds, toggleFavoriteTemplate } from '@/lib/actions/favorites'
import type { User } from '@supabase/supabase-js'

const CATEGORY_LABELS: Record<string, string> = {
  professional: 'Professional',
  modern: 'Modern',
  creative: 'Creative',
  minimal: 'Minimal',
}

export function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    checkSubscription().then(setIsSubscribed)
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) {
        getFavoriteTemplateIds().then((ids) => setFavoriteIds(new Set(ids)))
      }
    })
  }, [])

  function handleToggleFavorite(templateId: string) {
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(templateId)) {
        next.delete(templateId)
      } else {
        next.add(templateId)
      }
      return next
    })
    toggleFavoriteTemplate(templateId)
  }

  const filtered = (
    activeCategory === 'all'
      ? TEMPLATES
      : activeCategory === 'favorites'
        ? TEMPLATES.filter((t) => favoriteIds.has(t.id))
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
        {user && (
          <button
            onClick={() => setActiveCategory('favorites')}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1.5',
              activeCategory === 'favorites'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            <Heart className="h-3.5 w-3.5" />
            Favorites ({favoriteIds.size})
          </button>
        )}
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
          <TemplateCard
            key={template.id}
            template={template}
            locked={!!template.premium && isSubscribed === false}
            isFavorited={favoriteIds.has(template.id)}
            showFavorite={!!user}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      {/* Empty favorites state */}
      {activeCategory === 'favorites' && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold">No favorites yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Click the heart icon on any template to save it here.
          </p>
        </div>
      )}
    </div>
  )
}

function TemplateCard({
  template,
  locked,
  isFavorited,
  showFavorite,
  onToggleFavorite,
}: {
  template: TemplateInfo
  locked: boolean
  isFavorited: boolean
  showFavorite: boolean
  onToggleFavorite: (id: string) => void
}) {
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

        {/* Favorite heart button */}
        {showFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(template.id)
            }}
            className="absolute top-2 left-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-colors',
                isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
              )}
            />
          </button>
        )}

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
