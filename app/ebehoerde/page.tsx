"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { ebehoerdeCover } from "@/lib/case-study-images"
import EbehoerdeDe from "@/content/case-studies/ebehoerde/de.mdx"
import EbehoerdeEn from "@/content/case-studies/ebehoerde/en.mdx"

export default function eBehoerdePage() {
  const { t, locale } = useLocale()

  return (
    <CaseStudyPage title="eBehörde" copy={t.caseStudies.ebehoerde} cover={ebehoerdeCover}>
      {locale === "de" ? <EbehoerdeDe /> : <EbehoerdeEn />}
    </CaseStudyPage>
  )
}
