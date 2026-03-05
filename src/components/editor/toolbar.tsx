'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CloudOff,
  Download,
  LayoutGrid,
  Loader2,
} from 'lucide-react'
import { DownloadModal } from './download-modal'
import { TemplateDrawer } from './template-drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useResume } from '@/hooks/use-resume'
import { TEMPLATES } from '@/components/templates/template-registry'
import { FONT_OPTIONS, COLOR_PRESETS } from '@/types/resume'
import { cn } from '@/lib/utils'

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
    setThemeColor,
    setFontFamily,
  } = useResume()

  const [showDownload, setShowDownload] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  const currentTemplate = TEMPLATES.find((t) => t.id === templateId)

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
        {/* Template Picker Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTemplates(true)}
          className="gap-1.5"
        >
          <LayoutGrid className="h-4 w-4" />
          {currentTemplate?.name || 'Template'}
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
        </Button>

        <TemplateDrawer open={showTemplates} onOpenChange={setShowTemplates} />

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
