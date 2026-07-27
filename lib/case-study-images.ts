export interface CaseStudyImage {
  src: string
  width: number
  height: number
  video?: boolean
}

export const wtCover: CaseStudyImage = {
  src: "/images/wt186/1.png",
  width: 1296,
  height: 870,
}

// Media placed right after the intro, before the first section.
export const wtIntroMedia: CaseStudyImage[] = [
  { src: "/images/wt186/mvp-demo.mov", width: 0, height: 0, video: true },
]

// One media group per section, in the same order as the Wt186 sections
// in lib/content.ts: Vision & Konzept, Interface & Navigation,
// Herausforderungen & Lösungen, User-Testing & Validierung.
export const wtSectionMedia: CaseStudyImage[][] = [
  [{ src: "/images/wt186/2.png", width: 1217, height: 824 }],
  [
    { src: "/images/wt186/3.png", width: 1163, height: 715 },
    { src: "/images/wt186/4.png", width: 367, height: 586 },
    { src: "/images/wt186/5.png", width: 724, height: 401 },
  ],
  [
    { src: "/images/wt186/6.png", width: 2940, height: 1912 },
    { src: "/images/wt186/7.png", width: 1304, height: 895 },
  ],
  [{ src: "/images/wt186/8.png", width: 2940, height: 1912 }],
]

// Media shown at the very end, after all sections.
export const wtClosingMedia: CaseStudyImage[] = [
  { src: "/images/wt186/9.png", width: 2940, height: 1912 },
  { src: "/images/wt186/final-demo.mov", width: 0, height: 0, video: true },
]

export const ebehoerdeCover: CaseStudyImage = {
  src: "/images/ebehoerde-cover.png",
  width: 1535,
  height: 1219,
}

export const ebehoerdeClosingMedia: CaseStudyImage[] = [
  { src: "/images/ebehoerde/slice-1.png", width: 1440, height: 1496 },
  { src: "/images/ebehoerde/slice-2.png", width: 1440, height: 2273 },
  { src: "/images/ebehoerde/slice-3.png", width: 1440, height: 2304 },
  { src: "/images/ebehoerde/slice-4.png", width: 1440, height: 4016 },
  { src: "/images/ebehoerde/slice-5.png", width: 1440, height: 5371 },
  { src: "/images/ebehoerde/slice-6.png", width: 1440, height: 3344 },
]

export const planoraCover: CaseStudyImage = {
  src: "/images/planora/cover.png",
  width: 1600,
  height: 1188,
}

export const planoraGallery: CaseStudyImage[] = [
  { src: "/images/planora/slice-2.png", width: 1186, height: 1600 },
  { src: "/images/planora/slice-3.png", width: 1600, height: 1557 },
  { src: "/images/planora/slice-4.png", width: 1600, height: 911 },
  { src: "/images/planora/slice-5.png", width: 1600, height: 1317 },
  { src: "/images/planora/slice-6.png", width: 1600, height: 814 },
]

export const flavorFusionCover: CaseStudyImage = {
  src: "/images/flavor-fusion/cover.png",
  width: 1440,
  height: 921,
}

export const flavorFusionGallery: CaseStudyImage[] = [
  { src: "/images/flavor-fusion/landing.png", width: 1440, height: 4695 },
  { src: "/images/flavor-fusion/app-screen.png", width: 390, height: 844 },
]
