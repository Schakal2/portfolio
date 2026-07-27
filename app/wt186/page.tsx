"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { wtCover, wtGallery } from "@/lib/case-study-images"

export default function WtPage() {
  const { t } = useLocale()

  return (
    <CaseStudyPage
      title="WT-186"
      copy={t.caseStudies.wt}
      cover={wtCover}
      gallery={wtGallery}
    />
  )
}
