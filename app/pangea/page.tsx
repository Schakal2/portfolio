"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { pangeaCover } from "@/lib/case-study-images"
import PangeaDe from "@/content/case-studies/pangea/de.mdx"
import PangeaEn from "@/content/case-studies/pangea/en.mdx"

const headline = {
  de: "Ein PO-33 mit dem Multiplayer von Figma — und der Weg dahin: vom Feature-Bauen zum Gestalten, von Chrom zu Pixel.",
  en: "A PO-33 with the multiplayer of Figma — and the road there: from building features to designing, from chrome to pixel.",
}

export default function PangeaPage() {
  const { t, locale } = useLocale()

  return (
    <CaseStudyPage
      title="Pangea"
      copy={t.caseStudies.pangea}
      cover={pangeaCover}
      headline={headline[locale]}
      theme={{ surface: "#ede6da", accent: "#c8412a" }}
    >
      {locale === "de" ? <PangeaDe /> : <PangeaEn />}
    </CaseStudyPage>
  )
}
