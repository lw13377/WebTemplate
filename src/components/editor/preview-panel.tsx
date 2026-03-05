'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Check,
  FileDown,
  Loader2,
  RotateCcw,
  Save,
  Undo2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { DownloadModal } from './download-modal'
import { useResume } from '@/hooks/use-resume'
import { TemplateRenderer } from '@/components/templates/template-renderer'
import { PAGE_WIDTH, PAGE_HEIGHT } from '@/components/templates/base-styles'
import { checkSubscription } from '@/lib/actions/subscription'

export function PreviewPanel() {
  const {
    templateId,
    content,
    themeColor,
    fontFamily,
    saveStatus,
    hasUnsavedChanges,
    saveResume,
    discardChanges,
    mode,
  } = useResume()
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [autoScale, setAutoScale] = useState(1)
  const [showDownload, setShowDownload] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(true)

  // Check subscription status
  useEffect(() => {
    if (mode === 'guest') {
      setIsSubscribed(false)
    } else {
      checkSubscription().then(setIsSubscribed)
    }
  }, [mode])

  const isSaving = saveStatus === 'saving'

  // Screenshot deterrence: blur when tab is hidden
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        setIsHidden(true)
      } else {
        setTimeout(() => setIsHidden(false), 300)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Block print and screenshot keyboard shortcuts for non-subscribers
  useEffect(() => {
    if (isSubscribed) return

    // Block printing
    const style = document.createElement('style')
    style.textContent = '@media print { body { display: none !important; } }'
    document.head.appendChild(style)

    // Block common screenshot shortcuts
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && e.shiftKey && e.key === 'S') ||
        (e.ctrlKey && e.key === 'p')
      ) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.head.removeChild(style)
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [isSubscribed])

  // Calculate scale to fit container — fills available space
  useEffect(() => {
    function calcScale() {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const availW = rect.width - 24
      const availH = rect.height - 24
      const scaleW = availW / PAGE_WIDTH
      const scaleH = availH / PAGE_HEIGHT
      setAutoScale(Math.min(scaleW, scaleH, 1.15))
    }

    calcScale()
    const observer = new ResizeObserver(calcScale)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const effectiveScale = autoScale * zoom

  // Fade transition on template switch
  const [fadeKey, setFadeKey] = useState(templateId)
  const [opacity, setOpacity] = useState(1)
  useEffect(() => {
    if (templateId !== fadeKey) {
      setOpacity(0)
      const timer = setTimeout(() => {
        setFadeKey(templateId)
        setOpacity(1)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [templateId, fadeKey])

  return (
    <div className="flex h-full flex-col">
      {/* Action bar: save/discard/pdf + zoom */}
      <div className="flex flex-shrink-0 flex-wrap items-center gap-1 border-b bg-muted/20 px-2 py-1.5 sm:px-3">
        {/* Save / Discard / PDF */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {hasUnsavedChanges && (
            <Button variant="ghost" size="sm" onClick={discardChanges} className="hidden sm:inline-flex">
              <Undo2 className="h-4 w-4" />
              Discard
            </Button>
          )}
          {hasUnsavedChanges && (
            <Button variant="ghost" size="icon-sm" onClick={discardChanges} className="sm:hidden">
              <Undo2 className="h-4 w-4" />
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={saveResume}
            disabled={!hasUnsavedChanges || isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saveStatus === 'saved' && !hasUnsavedChanges ? (
              <Check className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {isSaving
                ? 'Saving...'
                : saveStatus === 'saved' && !hasUnsavedChanges
                  ? 'Saved'
                  : 'Save Progress'}
            </span>
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={async () => {
              if (hasUnsavedChanges) await saveResume()
              setShowDownload(true)
            }}
          >
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>

        {/* Zoom controls — pushed right, hidden on mobile */}
        <div className="ml-auto hidden items-center gap-0.5 sm:flex">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom Out</TooltipContent>
          </Tooltip>

          <span className="min-w-[3rem] text-center text-xs text-muted-foreground">
            {Math.round(effectiveScale * 100)}%
          </span>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
                disabled={zoom >= 2}
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom In</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setZoom(1)}
                disabled={zoom === 1}
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset Zoom</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Preview Area */}
      <div
        ref={containerRef}
        className="relative flex flex-1 items-start justify-center overflow-auto bg-muted/30 p-3"
        style={{ userSelect: 'none' }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          style={{
            transform: `scale(${effectiveScale})`,
            transformOrigin: 'top center',
            width: `${PAGE_WIDTH}px`,
            minHeight: `${PAGE_HEIGHT}px`,
            opacity,
            filter: isHidden ? 'blur(20px)' : 'none',
            transition: 'filter 0.3s ease, opacity 0.2s ease',
          }}
          className="relative shadow-xl"
        >
          <div id="resume-capture-target">
            <TemplateRenderer
              templateId={templateId}
              content={content}
              themeColor={themeColor}
              fontFamily={fontFamily}
            />
          </div>
          {/* Watermark for non-subscribers — tiled pattern */}
          {!isSubscribed && (
            <div
              className="pointer-events-none absolute inset-0 select-none overflow-hidden"
              style={{ transform: 'rotate(-25deg)', transformOrigin: 'center center' }}
            >
              <div className="flex flex-col items-center justify-center gap-16" style={{ width: '200%', height: '200%', marginLeft: '-50%', marginTop: '-30%' }}>
                {Array.from({ length: 6 }).map((_, row) => (
                  <div key={row} className="flex gap-12">
                    {Array.from({ length: 4 }).map((_, col) => (
                      <span
                        key={col}
                        className="font-bold uppercase tracking-widest"
                        style={{ fontSize: '32px', color: 'rgba(0,0,0,0.07)', whiteSpace: 'nowrap' }}
                      >
                        PREVIEW ONLY
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {isHidden && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <p className="text-lg font-medium text-muted-foreground">Resume hidden</p>
          </div>
        )}
      </div>

      <DownloadModal open={showDownload} onOpenChange={setShowDownload} />
    </div>
  )
}
