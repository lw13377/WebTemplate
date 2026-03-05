'use client'

import { useState } from 'react'
import { Download, Loader2, CreditCard, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { useResume } from '@/hooks/use-resume'
import { checkSubscription, activateDevSubscription } from '@/lib/actions/subscription'

interface DownloadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DownloadModal({ open, onOpenChange }: DownloadModalProps) {
  const { id, title } = useResume()
  const [downloading, setDownloading] = useState(false)
  const [activating, setActivating] = useState(false)

  async function handleDownload() {
    setDownloading(true)
    try {
      const isSubscribed = await checkSubscription()
      if (!isSubscribed) {
        setDownloading(false)
        return // Stay on modal to show upgrade prompt
      }

      const res = await fetch(`/api/resume/download?id=${id}`)
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Download failed')
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title || 'resume'}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success('PDF downloaded successfully!')
      onOpenChange(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Download failed')
    } finally {
      setDownloading(false)
    }
  }

  async function handleDevBypass() {
    setActivating(true)
    try {
      const ok = await activateDevSubscription()
      if (ok) {
        toast.success('Dev subscription activated!')
        await handleDownload()
      } else {
        toast.error('Failed to activate dev subscription')
      }
    } catch {
      toast.error('Failed to activate subscription')
    } finally {
      setActivating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download PDF
          </DialogTitle>
          <DialogDescription>
            Download your resume as a professional PDF file.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Pricing Card */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">ResumeForge Pro</h3>
                <p className="text-sm text-muted-foreground">Unlimited PDF downloads</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">$2</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Download unlimited PDFs
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Access all 50 templates
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Priority support
              </li>
            </ul>
          </div>

          {/* Subscribe Button (Stripe placeholder) */}
          <Button className="w-full" size="lg" disabled>
            <CreditCard className="h-4 w-4" />
            Subscribe — Coming Soon
          </Button>

          <Separator />

          {/* Already subscribed? Download */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {downloading ? 'Generating PDF...' : 'Download (if subscribed)'}
          </Button>

          {/* Dev bypass */}
          <div className="rounded border border-dashed border-yellow-500/50 bg-yellow-50/50 p-3 dark:bg-yellow-900/10">
            <p className="mb-2 text-xs font-medium text-yellow-700 dark:text-yellow-400">
              DEV MODE — Bypass payment for testing
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-yellow-500/50 text-yellow-700 hover:bg-yellow-100 dark:text-yellow-400"
              onClick={handleDevBypass}
              disabled={activating || downloading}
            >
              {activating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              {activating ? 'Activating...' : 'Activate Free & Download'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
