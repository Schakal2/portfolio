"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { planoraCover, planoraGallery } from "@/lib/case-study-images"

export default function PlanoraPage() {
  const { t } = useLocale()

  return (
    <CaseStudyPage
      title="Planora"
      copy={t.caseStudies.planora}
      cover={planoraCover}
      gallery={planoraGallery}
    />
  )
}
