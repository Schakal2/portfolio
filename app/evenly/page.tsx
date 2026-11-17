"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { evenlyCover } from "@/lib/case-study-images"
import EvenlyDe from "@/content/case-studies/evenly/de.mdx"
import EvenlyEn from "@/content/case-studies/evenly/en.mdx"

export default function EvenlyPage() {
  const { t, locale } = useLocale()

  return (
    <CaseStudyPage title="Evenly" copy={t.caseStudies.evenly} cover={evenlyCover}>
      {locale === "de" ? <EvenlyDe /> : <EvenlyEn />}
    </CaseStudyPage>
  )
}
