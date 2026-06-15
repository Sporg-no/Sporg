import { cn } from '@/lib/utils'

type BadgeVariant = 'gray' | 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'indigo'

const variantClasses: Record<BadgeVariant, string> = {
  gray:   'bg-white/6 text-sporg-text-2 border border-white/8',
  green:  'bg-green-500/15 text-green-400 border border-green-500/20',
  yellow: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  red:    'bg-red-500/15 text-red-400 border border-red-500/20',
  blue:   'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/20',
  indigo: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'gray', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function statusTilFarge(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    UTKAST:    'gray',
    PUBLISERT: 'green',
    AVLYST:    'red',
    AVSLUTTET: 'blue',
    VENTENDE:  'yellow',
    BEKREFTET: 'green',
    VENTELISTE:'purple',
    AVBESTILT: 'gray',
    AVVIST:    'red',
    FULLFORT:  'green',
    FEILET:    'red',
    REFUNDERT: 'blue',
    SOKT:      'yellow',
    GODKJENT:  'green',
  }
  return map[status] ?? 'gray'
}
