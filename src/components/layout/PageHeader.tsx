import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-8 flex items-start justify-between', className)}>
      <div>
        <h1
          className="text-2xl font-bold text-sporg-text"
          style={{ letterSpacing: '-0.025em' }}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-sporg-text-3">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}
