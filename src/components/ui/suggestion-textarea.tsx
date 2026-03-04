'use client'

import { useState, useCallback } from 'react'
import { ChevronDown, Lightbulb, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SuggestionTextareaProps {
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  placeholder?: string
  className?: string
  maxChars?: number
  label?: string
  mode: 'append' | 'replace'
}

export function SuggestionTextarea({
  value,
  onChange,
  suggestions,
  placeholder,
  className,
  maxChars,
  label = 'Suggestions',
  mode,
}: SuggestionTextareaProps) {
  const [expanded, setExpanded] = useState(false)

  const applySuggestion = useCallback(
    (suggestion: string) => {
      if (mode === 'replace') {
        onChange(suggestion)
      } else {
        const bullet = `- ${suggestion}`
        const newValue = value.trim() ? `${value}\n${bullet}` : bullet
        if (maxChars && newValue.length > maxChars) return
        onChange(newValue)
      }
    },
    [value, onChange, mode, maxChars]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value
      if (maxChars && val.length > maxChars) return
      onChange(val)
    },
    [onChange, maxChars]
  )

  return (
    <div className="space-y-2">
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            'flex min-h-[80px] w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
        />
        {maxChars && (
          <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {value.length} / {maxChars}
          </span>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="rounded-md border bg-muted/30">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            {label}
            <ChevronDown
              className={cn(
                'ml-auto h-3.5 w-3.5 transition-transform',
                expanded && 'rotate-180'
              )}
            />
          </button>
          {expanded && (
            <div className="space-y-1 border-t px-3 py-2">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applySuggestion(suggestion)}
                  className="flex w-full items-start gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent"
                >
                  <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="line-clamp-2">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
