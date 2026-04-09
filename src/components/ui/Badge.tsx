import { cn } from '@/lib/utils'

type BadgeVariant = 'gray' | 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'indigo'

const variantClasses: Record<BadgeVariant, string> = {
  gray: 'bg-gray-100 text-gray-700',
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red: 'bg-red-100 text-red-700',
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  indigo: 'bg-indigo-100 text-indigo-700',
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
    UTKAST: 'gray',
    PUBLISERT: 'green',
    AVLYST: 'red',
    AVSLUTTET: 'blue',
    VENTENDE: 'yellow',
    BEKREFTET: 'green',
    VENTELISTE: 'purple',
    AVBESTILT: 'gray',
    AVVIST: 'red',
    FULLFORT: 'green',
    FEILET: 'red',
    REFUNDERT: 'blue',
    SOKT: 'yellow',
    GODKJENT: 'green',
  }
  return map[status] ?? 'gray'
}
