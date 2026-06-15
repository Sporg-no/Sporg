'use client'

import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="flex h-14 items-center justify-between border-b border-sporg-border bg-sporg-surface px-6">
      <div />
      <div className="flex items-center gap-3">
        {session?.user && (
          <>
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sporg-accent/15 text-sporg-accent text-xs font-semibold">
                {session.user.name?.charAt(0).toUpperCase() ?? 'B'}
              </div>
              <span className="text-sm text-sporg-text-2">
                {session.user.name}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-sporg-text-3 hover:text-sporg-text"
            >
              Logg ut
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
