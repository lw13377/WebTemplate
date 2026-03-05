'use client'

import { useState } from 'react'
import { Eye, FileText, LayoutGrid, PenLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Toolbar } from './toolbar'
import { TemplateSidebar } from './template-strip'
import { FormPanel } from './form-panel'
import { PreviewPanel } from './preview-panel'

export function EditorLayout() {
  const [mobileView, setMobileView] = useState<'form' | 'preview' | 'templates'>('form')

  return (
    <div className="flex h-screen flex-col">
      {/* Toolbar */}
      <Toolbar />

      {/* Mobile toggle */}
      <div className="flex border-b bg-muted/30 md:hidden">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'flex-1 rounded-none',
            mobileView === 'form' && 'bg-background shadow-sm'
          )}
          onClick={() => setMobileView('form')}
        >
          <PenLine className="h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'flex-1 rounded-none',
            mobileView === 'preview' && 'bg-background shadow-sm'
          )}
          onClick={() => setMobileView('preview')}
        >
          <FileText className="h-4 w-4" />
          Preview
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'flex-1 rounded-none',
            mobileView === 'templates' && 'bg-background shadow-sm'
          )}
          onClick={() => setMobileView('templates')}
        >
          <LayoutGrid className="h-4 w-4" />
          Templates
        </Button>
      </div>

      {/* Three-column split view */}
      <div className="flex flex-1 overflow-hidden">
        {/* Form Panel (left) */}
        <div
          className={cn(
            'w-full flex-shrink-0 overflow-hidden border-r md:w-[28%]',
            mobileView !== 'form' && 'hidden md:block'
          )}
        >
          <FormPanel onViewPreview={() => setMobileView('preview')} />
        </div>

        {/* Preview Panel (center) */}
        <div
          className={cn(
            'w-full min-w-0 flex-1 overflow-hidden',
            mobileView !== 'preview' && 'hidden md:block'
          )}
        >
          <PreviewPanel />
        </div>

        {/* Template Sidebar (right) */}
        <div
          className={cn(
            'w-full flex-shrink-0 overflow-hidden border-l md:w-[420px] lg:w-[480px]',
            mobileView !== 'templates' && 'hidden md:block'
          )}
        >
          <TemplateSidebar />
        </div>
      </div>

      {/* Floating Preview FAB on mobile (form mode only) */}
      {mobileView === 'form' && (
        <Button
          className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full shadow-xl md:hidden"
          onClick={() => setMobileView('preview')}
          aria-label="Preview resume"
        >
          <Eye className="h-6 w-6" />
        </Button>
      )}

      {/* Floating Back-to-Edit FAB on mobile (preview mode only) */}
      {mobileView === 'preview' && (
        <Button
          variant="outline"
          className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-background shadow-xl md:hidden"
          onClick={() => setMobileView('form')}
          aria-label="Back to editing"
        >
          <PenLine className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
