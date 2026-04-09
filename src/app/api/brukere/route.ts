import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { RegistrerBrukerSchema } from '@/lib/validering'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = RegistrerBrukerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { feil: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { navn, epost, passord } = parsed.data

    const eksisterer = await prisma.bruker.findUnique({ where: { epost } })
    if (eksisterer) {
      return NextResponse.json(
        { feil: 'E-postadressen er allerede registrert' },
        { status: 409 }
      )
    }

    const passordHash = await bcrypt.hash(passord, 12)
    const bruker = await prisma.bruker.create({
      data: { navn, epost, passordHash, rolle: 'DELTAKER' },
      select: { id: true, navn: true, epost: true, rolle: true },
    })

    return NextResponse.json(bruker, { status: 201 })
  } catch {
    return NextResponse.json({ feil: 'Serverfeil' }, { status: 500 })
  }
}
