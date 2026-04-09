'use client'

import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div />
      <div className="flex items-center gap-4">
        {session?.user && (
          <>
            <span className="text-sm text-gray-600">
              Hei, <span className="font-medium">{session.user.name}</span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Logg ut
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
