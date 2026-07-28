"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { flavorFusionCover } from "@/lib/case-study-images"
import FlavorFusionDe from "@/content/case-studies/flavor-fusion/de.mdx"
import FlavorFusionEn from "@/content/case-studies/flavor-fusion/en.mdx"

export default function FlavorFusionPage() {
  const { t, locale } = useLocale()

  return (
    <CaseStudyPage title="Flavor Fusion" copy={t.caseStudies.flavorFusion} cover={flavorFusionCover}>
      {locale === "de" ? <FlavorFusionDe /> : <FlavorFusionEn />}
    </CaseStudyPage>
  )
}
