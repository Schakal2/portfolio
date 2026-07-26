export type Locale = "de" | "en"

export interface WorkItem {
  slug: string
  title: string
  role: string
  headline: string
  meta: string
  tag: string
  href: string | null
  ctaLabel: string
}

interface Content {
  meta: { title: string; description: string }
  nav: { home: string; work: string; contact: string }
  hero: {
    banner: string
    heading: string
    bio: string
    cta: string
    ringWords: string[]
  }
  skills: string[]
  work: {
    banner: string
    items: WorkItem[]
  }
  footer: {
    navTitle: string
    contactTitle: string
    rights: string
  }
}

export const content: Record<Locale, Content> = {
  de: {
    meta: {
      title: "Julian Wegner — UX/UI Designer",
      description:
        "Julian Wegner ist UX/UI Designer mit Hintergrund in Filmproduktion und Web-Development. Portfolio mit Case Studies und Projekten.",
    },
    nav: { home: "Home", work: "Projekte", contact: "Kontakt" },
    hero: {
      banner: "Willkommen",
      heading: "Hallo, ich bin Julian — UX/UI Designer, der aus Set und Code kommt.",
      bio: "Ich gestalte digitale Produkte, die klar, nutzbar und mit Charakter sind. Mit Hintergrund in Filmproduktion und Web-Development bringe ich Struktur und Neugier in jedes Projekt.",
      cta: "Projekte ansehen",
      ringWords: ["Neugierig", "Strukturiert", "Genau", "Bodenständig", "Direkt", "Kreativ"],
    },
    skills: [
      "Figma",
      "Next.js",
      "User Testing",
      "Information Architecture",
      "Rapid Prototyping",
      "User Journey Mapping",
      "HTML/CSS/JS",
    ],
    work: {
      banner: "Ausgewählte Arbeiten",
      items: [
        {
          slug: "ebehoerde",
          title: "eBehörde",
          role: "Digitale Behördenplattform",
          headline:
            "Eine digitale Plattform, die die Interaktion zwischen Bürger:innen und Behörden in Deutschland erleichtert.",
          meta: "UX/UI Design · Service Design",
          tag: "Case Study",
          href: "/ebehoerde",
          ctaLabel: "Case Study lesen",
        },
        {
          slug: "wt-186",
          title: "WT-186",
          role: "Wave-Terrain-Synthesizer-Plugin",
          headline:
            "Verwandelt hochgeladene Bild- und Audiodateien per Drag-and-Drop in dynamischen Klang.",
          meta: "UX/UI Design · Interaction Design",
          tag: "Bald verfügbar",
          href: null,
          ctaLabel: "Case Study lesen",
        },
        {
          slug: "planora",
          title: "Planora",
          role: "Reise-App",
          headline:
            "Vereint jedes Detail einer Reise an einem Ort — vom Notizenmachen über gespeicherte Orte bis zur Organisation von Tagesausflügen.",
          meta: "UX/UI Design · Mobile",
          tag: "Bald verfügbar",
          href: null,
          ctaLabel: "Case Study lesen",
        },
        {
          slug: "flavor-fusion",
          title: "Flavor Fusion",
          role: "Projekt in Arbeit",
          headline: "Case Study folgt.",
          meta: "UX/UI Design",
          tag: "Bald verfügbar",
          href: null,
          ctaLabel: "Case Study lesen",
        },
        {
          slug: "experimental-audio-encoder",
          title: "Experimental Audio Encoder",
          role: "Projekt in Arbeit",
          headline: "Case Study folgt.",
          meta: "Interaction Design",
          tag: "Bald verfügbar",
          href: null,
          ctaLabel: "Case Study lesen",
        },
      ],
    },
    footer: {
      navTitle: "Navigation",
      contactTitle: "Kontakt",
      rights: "Alle Rechte vorbehalten.",
    },
  },
  en: {
    meta: {
      title: "Julian Wegner — UX/UI Designer",
      description:
        "Julian Wegner is a UX/UI designer with a background in film production and web development. Portfolio with case studies and projects.",
    },
    nav: { home: "Home", work: "Work", contact: "Contact" },
    hero: {
      banner: "Welcome",
      heading: "Hi, I'm Julian — a UX/UI designer who came up through set and code.",
      bio: "I design digital products that feel clear, usable, and have character. With a background in film production and web development, I bring structure and curiosity to every project.",
      cta: "View projects",
      ringWords: ["Curious", "Structured", "Precise", "Grounded", "Direct", "Creative"],
    },
    skills: [
      "Figma",
      "Next.js",
      "User Testing",
      "Information Architecture",
      "Rapid Prototyping",
      "User Journey Mapping",
      "HTML/CSS/JS",
    ],
    work: {
      banner: "Featured Work",
      items: [
        {
          slug: "ebehoerde",
          title: "eBehörde",
          role: "Digital government platform",
          headline:
            "A digital platform designed to make it easier for citizens to interact with government agencies in Germany.",
          meta: "UX/UI Design · Service Design",
          tag: "Case Study",
          href: "/ebehoerde",
          ctaLabel: "Read case study",
        },
        {
          slug: "wt-186",
          title: "WT-186",
          role: "Wave-terrain synthesizer plugin",
          headline:
            "Turns uploaded image and audio files into dynamic sound through drag-and-drop integration.",
          meta: "UX/UI Design · Interaction Design",
          tag: "Coming soon",
          href: null,
          ctaLabel: "Read case study",
        },
        {
          slug: "planora",
          title: "Planora",
          role: "Travel app",
          headline:
            "Brings every detail of a trip into one place — from notes and saved spots to organizing day trips and timing.",
          meta: "UX/UI Design · Mobile",
          tag: "Coming soon",
          href: null,
          ctaLabel: "Read case study",
        },
        {
          slug: "flavor-fusion",
          title: "Flavor Fusion",
          role: "Work in progress",
          headline: "Case study coming soon.",
          meta: "UX/UI Design",
          tag: "Coming soon",
          href: null,
          ctaLabel: "Read case study",
        },
        {
          slug: "experimental-audio-encoder",
          title: "Experimental Audio Encoder",
          role: "Work in progress",
          headline: "Case study coming soon.",
          meta: "Interaction Design",
          tag: "Coming soon",
          href: null,
          ctaLabel: "Read case study",
        },
      ],
    },
    footer: {
      navTitle: "Navigation",
      contactTitle: "Contact",
      rights: "All rights reserved.",
    },
  },
}
