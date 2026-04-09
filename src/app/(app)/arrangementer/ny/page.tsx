import { PageHeader } from '@/components/layout/PageHeader'
import { ArrangementSkjema } from '@/components/arrangementer/ArrangementSkjema'

export default function NyttArrangementSide() {
  return (
    <div>
      <PageHeader
        title="Nytt arrangement"
        description="Fyll ut skjemaet under for å opprette et arrangement"
      />
      <ArrangementSkjema />
    </div>
  )
}
