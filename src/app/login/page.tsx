'use client'

import { Suspense, useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Mail, RotateCcw } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { createResume } from '@/lib/actions/resume'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const templateId = searchParams.get('template')
  const supabase = createClient()

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  // Sign Up state
  const [signUpName, setSignUpName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('')

  // UI state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Email confirmation state
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false)
  const [confirmationEmail, setConfirmationEmail] = useState('')
  const [resending, setResending] = useState(false)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleRedirectAfterAuth = useCallback(async () => {
    if (templateId) {
      await createResume(templateId)
      return
    }
    router.push(redirectTo)
  }, [templateId, redirectTo, router])

  // Poll for confirmation + listen for auth state changes
  useEffect(() => {
    if (!awaitingConfirmation) return

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        if (pollRef.current) clearInterval(pollRef.current)
        handleRedirectAfterAuth()
      }
    })

    pollRef.current = setInterval(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        if (pollRef.current) clearInterval(pollRef.current)
        handleRedirectAfterAuth()
      }
    }, 3000)

    return () => {
      subscription.unsubscribe()
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [awaitingConfirmation, supabase.auth, handleRedirectAfterAuth])

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      })

      if (error) {
        setError(error.message)
        return
      }

      await handleRedirectAfterAuth()
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    if (signUpPassword !== signUpConfirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (signUpPassword.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          data: {
            full_name: signUpName,
          },
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      // Supabase returns a fake user with no identities if email already exists
      if (data.user && data.user.identities?.length === 0) {
        setError('An account with this email already exists. Please sign in instead.')
        return
      }

      setConfirmationEmail(signUpEmail)
      setAwaitingConfirmation(true)
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setResending(true)
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: confirmationEmail,
      })
      if (error) {
        setError(error.message)
      } else {
        setSuccessMessage('Confirmation email resent!')
        setTimeout(() => setSuccessMessage(null), 3000)
      }
    } catch {
      setError('Failed to resend email.')
    } finally {
      setResending(false)
    }
  }

  // Email confirmation waiting screen
  if (awaitingConfirmation) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-12 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/20" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-900/20" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <Card className="border-0 shadow-xl shadow-black/5 dark:shadow-black/20">
            <CardContent className="flex flex-col items-center gap-6 pt-8 pb-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-8 w-8 text-primary" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Check your email</h2>
                <p className="text-sm text-muted-foreground">
                  We sent a confirmation link to{' '}
                  <strong className="text-foreground">{confirmationEmail}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                This page will refresh when your email is confirmed
              </div>

              {successMessage && (
                <div className="w-full rounded-md border border-emerald-500/30 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  {successMessage}
                </div>
              )}

              {error && (
                <div className="w-full rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="flex w-full flex-col gap-2">
                <Button
                  variant="outline"
                  onClick={handleResend}
                  disabled={resending}
                  className="w-full"
                >
                  {resending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RotateCcw className="h-4 w-4" />
                  )}
                  {resending ? 'Sending...' : 'Resend email'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setAwaitingConfirmation(false)
                    setError(null)
                    setSuccessMessage(null)
                  }}
                  className="w-full"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to sign up
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-12 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/20" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-900/20" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/10" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Branding */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Resumes in <span className="text-blue-600 dark:text-blue-400">Seconds</span>
            </h1>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Create professional resumes in minutes
          </p>
        </div>

        {/* Auth Card */}
        <Card className="border-0 shadow-xl shadow-black/5 dark:shadow-black/20">
          <Tabs defaultValue="signin" className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="w-full">
                <TabsTrigger value="signin" className="flex-1">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex-1">
                  Sign Up
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            {/* Error / Success Messages */}
            {(error || successMessage) && (
              <div className="px-6">
                {error && (
                  <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="rounded-md border border-emerald-500/30 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    {successMessage}
                  </div>
                )}
              </div>
            )}

            {/* Sign In Tab */}
            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                  <CardTitle className="text-lg">Welcome back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>

                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      required
                      disabled={loading}
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                      disabled={loading}
                      autoComplete="current-password"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </CardContent>
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  <CardTitle className="text-lg">Create an account</CardTitle>
                  <CardDescription>
                    Get started building your professional resume
                  </CardDescription>

                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      required
                      disabled={loading}
                      autoComplete="name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                      disabled={loading}
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="At least 6 characters"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      required
                      disabled={loading}
                      autoComplete="new-password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">
                      Confirm Password
                    </Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Re-enter your password"
                      value={signUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                      autoComplete="new-password"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </CardContent>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Continue as Guest */}
        <div className="mt-4 text-center">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Continue as Guest &rarr;
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
