"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { flavorFusionCover, flavorFusionGallery } from "@/lib/case-study-images"

export default function FlavorFusionPage() {
  const { t } = useLocale()

  return (
    <CaseStudyPage
      title="Flavor Fusion"
      copy={t.caseStudies.flavorFusion}
      cover={flavorFusionCover}
      gallery={flavorFusionGallery}
    />
  )
}
