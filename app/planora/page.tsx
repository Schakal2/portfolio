"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { planoraCover } from "@/lib/case-study-images"
import PlanoraDe from "@/content/case-studies/planora/de.mdx"
import PlanoraEn from "@/content/case-studies/planora/en.mdx"

export default function PlanoraPage() {
  const { t, locale } = useLocale()

  return (
    <CaseStudyPage title="Planora" copy={t.caseStudies.planora} cover={planoraCover}>
      {locale === "de" ? <PlanoraDe /> : <PlanoraEn />}
    </CaseStudyPage>
  )
}
