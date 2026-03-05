'use client'

import { Suspense, useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TemplateRenderer } from '@/components/templates/template-renderer'
import { TEMPLATES, TEMPLATE_CATEGORIES, type TemplateInfo } from '@/components/templates/template-registry'
import { useResume } from '@/hooks/use-resume'
import { cn } from '@/lib/utils'

interface TemplateDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function TemplateThumbnail({
  template,
  isActive,
  onClick,
  content,
  themeColor,
  fontFamily,
}: {
  template: TemplateInfo
  isActive: boolean
  onClick: () => void
  content: ReturnType<typeof useResume>['content']
  themeColor: string
  fontFamily: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-lg border-2 transition-all hover:shadow-md',
        isActive
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-border hover:border-primary/50'
      )}
    >
      {/* Mini preview */}
      <div className="pointer-events-none relative h-[220px] w-full overflow-hidden bg-white">
        <div
          style={{
            transform: 'scale(0.28)',
            transformOrigin: 'top left',
            width: '595px',
            height: '842px',
          }}
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                Loading...
              </div>
            }
          >
            <TemplateRenderer
              templateId={template.id}
              content={content}
              themeColor={themeColor}
              fontFamily={fontFamily}
            />
          </Suspense>
        </div>
      </div>

      {/* Label bar */}
      <div className="flex items-center justify-between border-t bg-muted/30 px-2.5 py-1.5">
        <span className="text-xs font-medium truncate">{template.name}</span>
        <div className="flex items-center gap-1.5">
          {'isNew' in template && (template as TemplateInfo & { isNew?: boolean }).isNew && (
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
              New
            </span>
          )}
          {isActive && (
            <span className="flex items-center gap-0.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
              <Check className="h-2.5 w-2.5" />
              Active
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export function TemplateDrawer({ open, onOpenChange }: TemplateDrawerProps) {
  const { content, templateId, themeColor, fontFamily, setTemplateId } = useResume()
  const [tab, setTab] = useState<string>('all')

  const filteredTemplates = useMemo(() => {
    if (tab === 'all') return TEMPLATES
    return TEMPLATES.filter((t) => t.category === tab)
  }, [tab])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[500px] max-w-full sm:max-w-[500px] overflow-y-auto p-0">
        <SheetHeader className="sticky top-0 z-10 border-b bg-background px-4 py-3">
          <SheetTitle className="text-base">Choose Template</SheetTitle>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              {TEMPLATE_CATEGORIES.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="flex-1 capitalize">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-3 p-4">
          {filteredTemplates.map((template) => (
            <TemplateThumbnail
              key={template.id}
              template={template}
              isActive={templateId === template.id}
              onClick={() => {
                setTemplateId(template.id)
                onOpenChange(false)
              }}
              content={content}
              themeColor={themeColor}
              fontFamily={fontFamily}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
