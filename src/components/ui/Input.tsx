import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-sporg-text-2">
            {label}
            {props.required && <span className="ml-1 text-sporg-accent opacity-80">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'block w-full rounded-xl border border-sporg-border bg-sporg-surface-3 px-3.5 py-2.5 text-sm text-sporg-text',
            'placeholder:text-sporg-text-3',
            'transition-all duration-150',
            'focus:border-sporg-accent/50 focus:bg-sporg-surface-2 focus:outline-none focus:ring-2 focus:ring-sporg-accent/20',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error && 'border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-sporg-text-3">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-sporg-text-2">
            {label}
            {props.required && <span className="ml-1 text-sporg-accent opacity-80">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'block w-full rounded-xl border border-sporg-border bg-sporg-surface-3 px-3.5 py-2.5 text-sm text-sporg-text',
            'placeholder:text-sporg-text-3 resize-y',
            'transition-all duration-150',
            'focus:border-sporg-accent/50 focus:bg-sporg-surface-2 focus:outline-none focus:ring-2 focus:ring-sporg-accent/20',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error && 'border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-sporg-text-3">{hint}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
