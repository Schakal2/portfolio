"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { meinteeCover } from "@/lib/case-study-images"
import MeinteeDe from "@/content/case-studies/meintee/de.mdx"
import MeinteeEn from "@/content/case-studies/meintee/en.mdx"

export default function MeinteePage() {
  const { t, locale } = useLocale()

  return (
    <CaseStudyPage title="meinTee" copy={t.caseStudies.meintee} cover={meinteeCover}>
      {locale === "de" ? <MeinteeDe /> : <MeinteeEn />}
    </CaseStudyPage>
  )
}
