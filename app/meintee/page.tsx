"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { meinteeCover } from "@/lib/case-study-images"
import MeinteeDe from "@/content/case-studies/meintee/de.mdx"
import MeinteeEn from "@/content/case-studies/meintee/en.mdx"

const headline = {
  de: "Ein Live-Shop, viele kleine Details und ein fester Ablauf, mit dem jede Änderung sicher online geht.",
  en: "A live store, many small details and one routine that lets every change go live safely.",
}

export default function MeinteePage() {
  const { t, locale } = useLocale()

  return (
    <CaseStudyPage
      title="meinTee"
      copy={t.caseStudies.meintee}
      cover={meinteeCover}
      headline={headline[locale]}
      theme={{ surface: "#f4f1e8", accent: "#1d7f74" }}
      hero={
        <video
          src="/images/meintee/logo-animation.mp4"
          poster="/images/meintee/logo-animation.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-label={locale === "de" ? "Animiertes meinTee-Logo" : "Animated meinTee logo"}
        />
      }
    >
      {locale === "de" ? <MeinteeDe /> : <MeinteeEn />}
    </CaseStudyPage>
  )
}
