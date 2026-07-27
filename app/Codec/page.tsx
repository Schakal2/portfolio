"use client"

import { useLocale } from "@/lib/locale-context"
import { CaseStudyPage } from "@/components/case-study-page"
import { codecCover, codecGallery } from "@/lib/case-study-images"

export default function CodecPage() {
  const { t } = useLocale()

  return (
    <CaseStudyPage
      title="Codec"
      copy={t.caseStudies.codec}
      cover={codecCover}
      gallery={codecGallery}
    />
  )
}
