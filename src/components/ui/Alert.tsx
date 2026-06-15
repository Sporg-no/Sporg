import { cn } from '@/lib/utils'

type AlertType = 'success' | 'error' | 'warning' | 'info'

const typeClasses: Record<AlertType, string> = {
  success: 'bg-green-500/10 border-green-500/25 text-green-400',
  error:   'bg-red-500/10 border-red-500/25 text-red-400',
  warning: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
  info:    'bg-blue-500/10 border-blue-500/25 text-blue-400',
}

interface AlertProps {
  type?: AlertType
  children: React.ReactNode
  className?: string
}

export function Alert({ type = 'info', children, className }: AlertProps) {
  return (
    <div
      className={cn('rounded-xl border px-4 py-3 text-sm font-medium', typeClasses[type], className)}
    >
      {children}
    </div>
  )
}
