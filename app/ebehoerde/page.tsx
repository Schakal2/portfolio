"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { ebehoerdeCover, ebehoerdeClosingMedia } from "@/lib/case-study-images"

export default function eBehoerdePage() {
  const { t } = useLocale()

  return (
    <CaseStudyPage
      title="eBehörde"
      copy={t.caseStudies.ebehoerde}
      cover={ebehoerdeCover}
      closingMedia={ebehoerdeClosingMedia}
    />
  )
}
