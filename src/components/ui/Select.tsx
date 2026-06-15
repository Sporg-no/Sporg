import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-sporg-text-2">
            {label}
            {props.required && <span className="ml-1 text-sporg-accent opacity-80">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'block w-full rounded-xl border border-sporg-border bg-sporg-surface-3 px-3.5 py-2.5 text-sm text-sporg-text',
            'transition-all duration-150',
            'focus:border-sporg-accent/50 focus:bg-sporg-surface-2 focus:outline-none focus:ring-2 focus:ring-sporg-accent/20',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error && 'border-red-500/60',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#1c1c20]">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
