'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Check,
  CloudOff,
  Download,
  Loader2,
} from 'lucide-react'
import { DownloadModal } from './download-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useResume } from '@/hooks/use-resume'
import { FONT_OPTIONS, COLOR_PRESETS } from '@/types/resume'
import { cn } from '@/lib/utils'

const TEMPLATE_GROUPS = [
  {
    label: 'Professional',
    templates: [
      { id: 'professional-classic', name: 'Classic' },
      { id: 'professional-executive', name: 'Executive' },
      { id: 'professional-corporate', name: 'Corporate' },
      { id: 'professional-formal', name: 'Formal' },
      { id: 'professional-traditional', name: 'Traditional' },
    ],
  },
  {
    label: 'Modern',
    templates: [
      { id: 'modern-sleek', name: 'Sleek' },
      { id: 'modern-gradient', name: 'Gradient' },
      { id: 'modern-sidebar', name: 'Sidebar' },
      { id: 'modern-timeline', name: 'Timeline' },
      { id: 'modern-grid', name: 'Grid' },
    ],
  },
  {
    label: 'Creative',
    templates: [
      { id: 'creative-vibrant', name: 'Vibrant' },
      { id: 'creative-artistic', name: 'Artistic' },
      { id: 'creative-bold', name: 'Bold' },
      { id: 'creative-asymmetric', name: 'Asymmetric' },
      { id: 'creative-portfolio', name: 'Portfolio' },
    ],
  },
  {
    label: 'Minimal',
    templates: [
      { id: 'minimal-clean', name: 'Clean' },
      { id: 'minimal-whitespace', name: 'Whitespace' },
      { id: 'minimal-simple', name: 'Simple' },
      { id: 'minimal-elegant', name: 'Elegant' },
      { id: 'minimal-refined', name: 'Refined' },
    ],
  },
]

function SaveIndicator({ status }: { status: string }) {
  switch (status) {
    case 'saving':
      return (
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" />
          Saving...
        </span>
      )
    case 'saved':
      return (
        <span className="flex items-center gap-1.5 text-xs text-emerald-600">
          <Check className="h-3 w-3" />
          Saved
        </span>
      )
    case 'error':
      return (
        <span className="flex items-center gap-1.5 text-xs text-destructive">
          <CloudOff className="h-3 w-3" />
          Error saving
        </span>
      )
    default:
      return null
  }
}

export function Toolbar() {
  const {
    title,
    templateId,
    themeColor,
    fontFamily,
    saveStatus,
    setTitle,
    setTemplateId,
    setThemeColor,
    setFontFamily,
  } = useResume()

  const [showDownload, setShowDownload] = useState(false)

  return (
    <div className="border-b bg-background">
      {/* Top row: title, save status, back, download */}
      <div className="flex items-center gap-3 px-4 py-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Back to Dashboard</TooltipContent>
        </Tooltip>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-8 max-w-[260px] border-transparent bg-transparent text-sm font-semibold hover:border-input focus-visible:border-ring"
          placeholder="Untitled Resume"
        />

        <SaveIndicator status={saveStatus} />

        <div className="ml-auto">
          <Button variant="outline" size="sm" onClick={() => setShowDownload(true)}>
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
        </div>

        <DownloadModal open={showDownload} onOpenChange={setShowDownload} />
      </div>

      {/* Bottom row: template, font, color swatches */}
      <div className="flex flex-wrap items-center gap-2 border-t px-4 py-2">
        {/* Template Selector */}
        <Select value={templateId} onValueChange={setTemplateId}>
          <SelectTrigger size="sm" className="w-[180px]">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {TEMPLATE_GROUPS.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.templates.map((tpl) => (
                  <SelectItem key={tpl.id} value={tpl.id}>
                    {tpl.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        {/* Font Selector */}
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger size="sm" className="w-[160px]">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {FONT_OPTIONS.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Inline Color Swatches */}
        <div className="flex flex-wrap items-center gap-1.5">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setThemeColor(color)}
              className={cn(
                'relative h-6 w-6 rounded-full border transition-transform hover:scale-110',
                themeColor === color && 'ring-2 ring-ring ring-offset-1'
              )}
              style={{ backgroundColor: color }}
              aria-label={`Set theme color to ${color}`}
            >
              {themeColor === color && (
                <Check className="absolute inset-0 m-auto h-3 w-3 text-white drop-shadow" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
