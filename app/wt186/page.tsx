"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { wtCover, wtIntroMedia, wtSectionMedia, wtClosingMedia } from "@/lib/case-study-images"

export default function WtPage() {
  const { t } = useLocale()

  return (
    <CaseStudyPage
      title="WT-186"
      copy={t.caseStudies.Wt186}
      cover={wtCover}
      introMedia={wtIntroMedia}
      sectionMedia={wtSectionMedia}
      closingMedia={wtClosingMedia}
    />
  )
}
