"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { wtCover } from "@/lib/case-study-images"
import WtDe from "@/content/case-studies/wt186/de.mdx"
import WtEn from "@/content/case-studies/wt186/en.mdx"

export default function WtPage() {
  const { t, locale } = useLocale()

  return (
    <CaseStudyPage title="WT-186" copy={t.caseStudies.Wt186} cover={wtCover}>
      {locale === "de" ? <WtDe /> : <WtEn />}
    </CaseStudyPage>
  )
}
