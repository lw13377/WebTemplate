'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Download, Loader2, CreditCard, Sparkles, UserPlus } from 'lucide-react'
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
  const { title, mode } = useResume()
  const [downloading, setDownloading] = useState(false)
  const [subscribing, setSubscribing] = useState(false)
  const [activating, setActivating] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)

  // Check subscription status when modal opens (skip for guests)
  useEffect(() => {
    if (open && mode === 'authenticated') {
      setIsSubscribed(null)
      checkSubscription().then(setIsSubscribed)
    }
  }, [open, mode])

  async function downloadPdf() {
    setDownloading(true)
    try {
      const { default: html2canvas } = await import('html2canvas-pro')
      const { jsPDF } = await import('jspdf')

      const element = document.getElementById('resume-capture-target')
      if (!element) throw new Error('Preview not found')

      // Clone the element and render off-screen at full A4 size
      const clone = element.cloneNode(true) as HTMLElement
      clone.style.position = 'fixed'
      clone.style.left = '-9999px'
      clone.style.top = '0'
      clone.style.width = '595px'
      clone.style.minHeight = '842px'
      clone.style.transform = 'none'
      clone.style.opacity = '1'
      clone.style.filter = 'none'
      document.body.appendChild(clone)

      try {
        const canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        })

        const pdf = new jsPDF('p', 'pt', 'a4')
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        const imgWidth = canvas.width / 2 // account for scale: 2
        const imgHeight = canvas.height / 2
        const ratio = pdfWidth / imgWidth
        const scaledHeight = imgHeight * ratio

        const imgData = canvas.toDataURL('image/png')

        if (scaledHeight <= pdfHeight) {
          // Fits on one page
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, scaledHeight)
        } else {
          // Multi-page: tile the image across pages
          let position = 0
          while (position < scaledHeight) {
            if (position > 0) pdf.addPage()
            pdf.addImage(imgData, 'PNG', 0, -position, pdfWidth, scaledHeight)
            position += pdfHeight
          }
        }

        pdf.save(`${title || 'resume'}.pdf`)
      } finally {
        document.body.removeChild(clone)
      }

      toast.success('PDF downloaded successfully!')
      onOpenChange(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Download failed')
    } finally {
      setDownloading(false)
    }
  }

  async function handleSubscribe() {
    setSubscribing(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to start checkout')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to start checkout')
      setSubscribing(false)
    }
  }

  async function handleDevBypass() {
    setActivating(true)
    try {
      const ok = await activateDevSubscription()
      if (ok) {
        toast.success('Dev subscription activated!')
        setIsSubscribed(true)
        await downloadPdf()
      } else {
        toast.error('Failed to activate dev subscription')
      }
    } catch {
      toast.error('Failed to activate subscription')
    } finally {
      setActivating(false)
    }
  }

  // Guest mode — prompt to upgrade to Pro
  if (mode === 'guest') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Upgrade to Pro
            </DialogTitle>
            <DialogDescription>
              PDF downloads are available on the Pro plan. Create an account and subscribe to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Pro Plan</h3>
                  <p className="text-sm text-muted-foreground">Unlimited PDF downloads</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">$2</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
              </div>
            </div>
            <Button className="w-full" size="lg" asChild>
              <Link href="/login">
                <CreditCard className="h-4 w-4" />
                Create Account & Subscribe
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Loading state while checking subscription
  if (isSubscribed === null) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Subscribed — show direct download
  if (isSubscribed) {
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


          <Button
            className="w-full"
            size="lg"
            onClick={downloadPdf}
            disabled={downloading}
          >
            {downloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {downloading ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        </DialogContent>
      </Dialog>
    )
  }

  // Not subscribed — show paywall
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download PDF
          </DialogTitle>
          <DialogDescription>
            Subscribe to download your resume as a professional PDF file.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">

          {/* Pricing Card */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Pro Plan</h3>
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

          {/* Subscribe Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleSubscribe}
            disabled={subscribing}
          >
            {subscribing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="h-4 w-4" />
            )}
            {subscribing ? 'Redirecting to checkout...' : 'Subscribe — $2/mo'}
          </Button>

          {/* Dev bypass — only in development */}
          {process.env.NODE_ENV === 'development' && (
            <>
              <Separator />
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
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
