'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Check,
  FileText,
  Type,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useResume } from '@/hooks/use-resume'
import { FONT_OPTIONS, COLOR_PRESETS } from '@/types/resume'
import { cn } from '@/lib/utils'

export function Toolbar() {
  const {
    title,
    themeColor,
    fontFamily,
    mode,
    setTitle,
    setThemeColor,
    setFontFamily,
  } = useResume()

  return (
    <div className="border-b bg-background">
      {/* Single row: back, title, font, colors */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-2">
        <Link href="/" className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold tracking-tight">Resumes in Seconds</span>
        </Link>

        <div className="mx-1 h-5 w-px bg-border" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" asChild>
              <Link href={mode === 'guest' ? '/' : '/dashboard'}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{mode === 'guest' ? 'Back to Home' : 'Back to Dashboard'}</TooltipContent>
        </Tooltip>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-8 max-w-[220px] border-transparent bg-transparent text-sm font-semibold hover:border-input focus-visible:border-ring"
          placeholder="Untitled Resume"
        />

        <div className="hidden items-center gap-2 sm:flex">
          <FontPicker value={fontFamily} onChange={setFontFamily} />

          <div className="flex flex-wrap items-center gap-1">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setThemeColor(color)}
                className={cn(
                  'relative h-5 w-5 rounded-full border transition-transform hover:scale-110',
                  themeColor === color && 'ring-2 ring-ring ring-offset-1'
                )}
                style={{ backgroundColor: color }}
                aria-label={`Set theme color to ${color}`}
              >
                {themeColor === color && (
                  <Check className="absolute inset-0 m-auto h-2.5 w-2.5 text-white drop-shadow" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile-only font + colors row */}
      <div className="flex flex-wrap items-center gap-2 border-t px-4 py-2 sm:hidden">
        <FontPicker value={fontFamily} onChange={setFontFamily} />

        <div className="flex flex-wrap items-center gap-1">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setThemeColor(color)}
              className={cn(
                'relative h-5 w-5 rounded-full border transition-transform hover:scale-110',
                themeColor === color && 'ring-2 ring-ring ring-offset-1'
              )}
              style={{ backgroundColor: color }}
              aria-label={`Set theme color to ${color}`}
            >
              {themeColor === color && (
                <Check className="absolute inset-0 m-auto h-2.5 w-2.5 text-white drop-shadow" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const FONT_VAR_MAP: Record<string, string> = {
  'Inter': 'var(--font-inter)',
  'Roboto': 'var(--font-roboto)',
  'Lato': 'var(--font-lato)',
  'Playfair Display': 'var(--font-playfair)',
  'Merriweather': 'var(--font-merriweather)',
  'Poppins': 'var(--font-poppins)',
  'Open Sans': 'var(--font-open-sans)',
  'Raleway': 'var(--font-raleway)',
  'Montserrat': 'var(--font-montserrat)',
  'Source Serif Pro': 'var(--font-source-serif)',
  'Nunito': 'var(--font-nunito)',
  'Cabin': 'var(--font-cabin)',
  'PT Sans': 'var(--font-pt-sans)',
  'PT Serif': 'var(--font-pt-serif)',
  'Libre Baskerville': 'var(--font-libre-baskerville)',
  'Josefin Sans': 'var(--font-josefin-sans)',
  'Work Sans': 'var(--font-work-sans)',
  'DM Sans': 'var(--font-dm-sans)',
  'Rubik': 'var(--font-rubik)',
  'Bitter': 'var(--font-bitter)',
  'Crimson Text': 'var(--font-crimson-text)',
  'Cormorant Garamond': 'var(--font-cormorant-garamond)',
  'EB Garamond': 'var(--font-eb-garamond)',
  'Mukta': 'var(--font-mukta)',
  'Karla': 'var(--font-karla)',
}

function fontCss(name: string) {
  return FONT_VAR_MAP[name] || name
}

function FontPicker({ value, onChange }: { value: string; onChange: (font: string) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Type className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          Change Font
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-1" align="start">
        <p className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">Choose a font</p>
        <div className="max-h-[360px] overflow-y-auto">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font}
              type="button"
              onClick={() => onChange(font)}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-2.5 py-2 transition-colors hover:bg-accent',
                value === font && 'bg-accent'
              )}
            >
              <span
                className="flex-1 text-left text-[15px]"
                style={{ fontFamily: fontCss(font) }}
              >
                {font}
              </span>
              {value === font && (
                <Check className="h-4 w-4 shrink-0 text-primary" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
