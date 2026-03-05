'use client'

import { useState } from 'react'
import { Eye, FileText, FolderOpen, LayoutGrid, PenLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Toolbar } from './toolbar'
import { TemplateSidebar } from './template-strip'
import { FormPanel } from './form-panel'
import { PreviewPanel } from './preview-panel'
import { SavedResumesPanel } from './saved-resumes-panel'

export function EditorLayout() {
  const [mobileView, setMobileView] = useState<'form' | 'preview' | 'templates' | 'saved'>('form')
  const [rightTab, setRightTab] = useState<'templates' | 'saved'>('templates')

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
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'flex-1 rounded-none',
            mobileView === 'saved' && 'bg-background shadow-sm'
          )}
          onClick={() => setMobileView('saved')}
        >
          <FolderOpen className="h-4 w-4" />
          Saved
        </Button>
      </div>

      {/* Main layout */}
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
          <PreviewPanel onEditResume={() => setMobileView('form')} />
        </div>

        {/* Right Sidebar — Templates + Saved (desktop: tabbed, mobile: separate views) */}
        <div
          className={cn(
            'w-full flex-shrink-0 overflow-hidden border-l md:w-[420px] lg:w-[480px]',
            // On mobile, show when either templates or saved tab is active
            mobileView !== 'templates' && mobileView !== 'saved' && 'hidden md:block'
          )}
        >
          <div className="flex h-full flex-col">
            {/* Desktop tab switcher */}
            <div className="hidden flex-shrink-0 border-b md:flex">
              <button
                type="button"
                onClick={() => setRightTab('templates')}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors',
                  rightTab === 'templates'
                    ? 'border-b-2 border-primary text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Templates
              </button>
              <button
                type="button"
                onClick={() => setRightTab('saved')}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors',
                  rightTab === 'saved'
                    ? 'border-b-2 border-primary text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <FolderOpen className="h-3.5 w-3.5" />
                Saved Resumes
              </button>
            </div>

            {/* Content — on mobile use mobileView, on desktop use rightTab */}
            <div className="flex-1 overflow-hidden">
              {/* Mobile: templates */}
              <div className={cn('h-full', mobileView !== 'templates' && 'hidden md:hidden')}>
                <TemplateSidebar />
              </div>
              {/* Mobile: saved */}
              <div className={cn('h-full', mobileView !== 'saved' && 'hidden md:hidden')}>
                <SavedResumesPanel />
              </div>
              {/* Desktop: templates */}
              <div className={cn('hidden h-full', rightTab === 'templates' && 'md:block')}>
                <TemplateSidebar />
              </div>
              {/* Desktop: saved */}
              <div className={cn('hidden h-full', rightTab === 'saved' && 'md:block')}>
                <SavedResumesPanel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Preview FAB on mobile (form mode only) */}
      {mobileView === 'form' && (
        <Button
          className="fixed bottom-5 right-5 z-50 gap-2 rounded-full px-5 py-3 shadow-xl md:hidden"
          onClick={() => setMobileView('preview')}
        >
          <Eye className="h-5 w-5" />
          Preview
        </Button>
      )}

      {/* Floating Back-to-Edit FAB on mobile (preview mode only) */}
      {mobileView === 'preview' && (
        <Button
          variant="outline"
          className="fixed bottom-5 right-5 z-50 gap-2 rounded-full bg-background px-5 py-3 shadow-xl md:hidden"
          onClick={() => setMobileView('form')}
        >
          <PenLine className="h-5 w-5" />
          Edit Resume
        </Button>
      )}
    </div>
  )
}
