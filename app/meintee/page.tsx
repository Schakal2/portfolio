"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { meinteeCover } from "@/lib/case-study-images"
import MeinteeDe from "@/content/case-studies/meintee/de.mdx"
import MeinteeEn from "@/content/case-studies/meintee/en.mdx"

const headline = {
  de: "Neu in Shopify, mit UX-Blick: wie ich in zwei Wochen aus technischen Tickets bessere Momente für Kund:innen gemacht habe.",
  en: "New to Shopify, with a UX lens: how I turned technical tickets into better moments for customers in two weeks.",
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
