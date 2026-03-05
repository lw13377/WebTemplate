'use client'

import { useState, useRef, useEffect } from 'react'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useResume } from '@/hooks/use-resume'
import { TemplateRenderer } from '@/components/templates/template-renderer'
import { PAGE_WIDTH, PAGE_HEIGHT } from '@/components/templates/base-styles'

export function PreviewPanel() {
  const { templateId, content, themeColor, fontFamily } = useResume()
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [autoScale, setAutoScale] = useState(1)

  // Calculate scale to fit container
  useEffect(() => {
    function calcScale() {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const padding = 40
      const availW = rect.width - padding
      const availH = rect.height - padding
      const scaleW = availW / PAGE_WIDTH
      const scaleH = availH / PAGE_HEIGHT
      setAutoScale(Math.min(scaleW, scaleH, 1))
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
      {/* Zoom Controls */}
      <div className="flex items-center justify-center gap-1 border-b bg-muted/20 px-3 py-1.5">
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

        <span className="min-w-[3.5rem] text-center text-xs text-muted-foreground">
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

      {/* Preview Area */}
      <div
        ref={containerRef}
        className="flex flex-1 items-start justify-center overflow-auto bg-muted/30 p-5"
      >
        <div
          style={{
            transform: `scale(${effectiveScale})`,
            transformOrigin: 'top center',
            width: `${PAGE_WIDTH}px`,
            minHeight: `${PAGE_HEIGHT}px`,
            opacity,
          }}
          className="shadow-xl transition-opacity duration-200"
        >
          <TemplateRenderer
            templateId={templateId}
            content={content}
            themeColor={themeColor}
            fontFamily={fontFamily}
          />
        </div>
      </div>
    </div>
  )
}
