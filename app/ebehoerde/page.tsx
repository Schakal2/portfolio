"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { ebehoerdeCover, ebehoerdeGallery } from "@/lib/case-study-images"

export default function EBehoerdePage() {
  const { t } = useLocale()

  return (
    <CaseStudyPage
      title="eBehörde"
      copy={t.caseStudies.ebehoerde}
      cover={ebehoerdeCover}
      gallery={ebehoerdeGallery}
    />
  )
}
