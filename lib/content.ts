export type Locale = "de" | "en"

export interface WorkItem {
  slug: string
  title: string
  role: string
  headline: string
  meta: string
  tag: string
  tags?: string[]
  href: string | null
  ctaLabel: string
  cover?: string
  external?: boolean
}

export interface CaseStudyCopy {
  back: string
  role: string
  tags: string[]
}

interface Content {
  meta: { title: string; description: string }
  nav: { home: string; work: string; contact: string; cv: string }
  hero: {
    banner: string
    heading: string
    bio: string
    cta: string
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
  caseStudies: {
    Wt186: CaseStudyCopy
    ebehoerde: CaseStudyCopy
    planora: CaseStudyCopy
    flavorFusion: CaseStudyCopy
  }
}

export const content: Record<Locale, Content> = {
  de: {
    meta: {
      title: "Julian Wegner — UX/UI Designer",
      description:
        "Julian Wegner ist UX/UI Designer mit Hintergrund in Filmproduktion und Web-Development. Portfolio mit Case Studies und Projekten.",
    },
    nav: { home: "Home", work: "Projekte", contact: "Kontakt", cv: "CV" },
    hero: {
      banner: "Willkommen",
      heading: "Hallo, ich bin Julian — UX/UI Designer, der aus Set und Code kommt.",
      bio: "Ich gestalte digitale Produkte, die klar, nutzbar und mit Charakter sind. Mit Hintergrund in Filmproduktion und Web-Development bringe ich Struktur und Neugier in jedes Projekt.",
      cta: "Projekte ansehen",
    },
    skills: [
      "UX Design",
      "Web Design",
      "Product Design",
      "Wireframing",
      "Low / High-Fidelity Prototyping",
      "Usability Testing",
      "UX Research",
      "Persona",
      "Accessibility (WCAG)",
      "User Testing & Insights",
      "Survey Design",
      "User Interviewing",
      "UI Design (Figma)",
      "Design Systems",,
      "Responsive Design",
      "JavaScript",
      "HTML / CSS",
      "React / Next.js",
      "Git / GitHub",
      "Agile / Scrum",
      "UX Requirements",
    ],
    work: {
      banner: "Ausgewählte Arbeiten",
      items: [
        {
          slug: "wt-186",
          title: "WT-186",
          role: "Wave-Terrain-Synthesizer-Plugin",
          headline:
            "Verwandelt hochgeladene Bild- und Audiodateien per Drag-and-Drop in dynamischen Klang.",
          meta: "UX/UI Design · Interaction Design",
          tag: "Audio Plug-In",
          tags: [
            "UX / Product Design",
            "UI Design (Figma)",
            "Low / High-Fidelity Prototyping",
            "DOM Manipulation",
            "JavaScript (ES6+)",
            "Responsive HTML / CSS",
            "UI Performance & Optimization",
            "Developer Handoff",
            "Cross-Functional Collaboration",
          ],
          href: "/wt186",
          ctaLabel: "Case Study lesen",
          cover: "/images/wt186/splash3.png",
        },
        {
          slug: "ebehoerde",
          title: "eBehörde",
          role: "Digitale Behördenplattform",
          headline:
            "Eine digitale Plattform, die die Interaktion zwischen Bürger:innen und Behörden in Deutschland erleichtert.",
          meta: "UX/UI Design · Service Design · Mobile",
          tag: "Case Study",
          tags: [
            "UX / Product Design",
            "Accessibility (WCAG)",
            "UX Research Synthesis",
            "User Testing & Insights",
            "Persona Development",
            "Task Analysis",
            "Wireframing",
            "Usability Testing",
            "Heuristic Evaluation",
            "Survey Design",
            "User Interviewing",
            "Thematic Analysis",
            "Metrics & Research KPIs",
            "Reporting & Presenting",
            "UI Design (Figma)",
            "Responsive Design",
            "Requirements Gathering",
            "UX Documentation & User Stories",
          ],
          href: "/ebehoerde",
          ctaLabel: "Case Study lesen",
          cover: "/images/ebehoerde-cover.png",
        },
        {
          slug: "planora",
          title: "Planora",
          role: "Reise-App",
          headline:
            "Vereint jedes Detail einer Reise an einem Ort — vom Notizenmachen über gespeicherte Orte bis zur Organisation von Tagesausflügen.",
          meta: "UX/UI Design · Mobile",
          tag: "Case Study",
          tags: [
            "UX / Product Design",
            "Low / High-Fidelity Prototyping",
            "User Interviewing",
            "Survey Design",
            "Design Systems",
            "Component Libraries",
            "Responsive Design",
            "Developer Handoff",
            "Agile / Scrum",
            "Stakeholder Communication",
          ],
          href: "/planora",
          ctaLabel: "Case Study lesen",
          cover: "/images/planora/cover.png",
        },
        {
          slug: "experimental-audio-encoder",
          title: "NOISE-CODEC",
          role: "Experimenteller Audio-Codec",
          headline:
            "Verwandelt Sound in eine Zeile Text und zurück in Klang — vier Encoding-Algorithmen, komplett im Browser.",
          meta: "Interaction Design · Web Audio",
          tag: "Website",
          tags: [
            "JavaScript (ES6+)",
            "DOM Manipulation",
            "Responsive HTML / CSS",
            "UI Performance & Optimization",
            "React / Next.js",
            "Git / GitHub",
          ],
          href: "/codec.html",
          ctaLabel: "Website besuchen",
          cover: "/images/NOISE-CODEC v6.0/2.png",
          external: true,
        },
        {
          slug: "flavor-fusion",
          title: "Flavor Fusion",
          role: "Rezept-App Landingpage",
          headline: "Landingpage, die zeigt, wie Rezepte entdecken und entspanntes Kochen zusammenkommen.",
          meta: "UX/UI Design · Landing Page",
          tag: "Case Study",
          tags: [
            "UX / Product Design",
            "UI Design (Figma)",
            "Responsive Design",
            "React / Next.js",
            "Responsive HTML / CSS",
            "Component Libraries",
            "Design Systems",
          ],
          href: "/flavor-fusion",
          ctaLabel: "Case Study lesen",
          cover: "/images/flavor-fusion/cover.png",
        },
      ],
    },
    footer: {
      navTitle: "Navigation",
      contactTitle: "Kontakt",
      rights: "Alle Rechte vorbehalten.",
    },
    caseStudies: {
      Wt186: {
        back: "Zurück zur Übersicht",
        role: "Wave-Terrain-Synthesizer-Plugin",
        tags: ["UX/UI Design", "Interaction Design"],
      },
      ebehoerde: {
        back: "Zurück zur Übersicht",
        role: "Digitale Behördenplattform",
        tags: ["UX/UI Design", "Service Design"],
      },
      planora: {
        back: "Zurück zur Übersicht",
        role: "Reise-App",
        tags: ["UX/UI Design", "Mobile"],
      },
      flavorFusion: {
        back: "Zurück zur Übersicht",
        role: "Rezept-App Landingpage",
        tags: ["UX/UI Design", "Landing Page"],
      },
    },
  },
  en: {
    meta: {
      title: "Julian Wegner — UX/UI Designer",
      description:
        "Julian Wegner is a UX/UI designer with a background in audio and web development. Portfolio with case studies and projects.",
    },
    nav: { home: "Home", work: "Work", contact: "Contact", cv: "CV" },
    hero: {
      banner: "Welcome",
      heading: "Hi, I'm Julian. I design intuitive digital experiences grounded in a deep technical foundation.",
      bio: "I design digital products that feel clear, usable, and have character. With a background in audio and web development, I bring structure and curiosity to every project.",
      cta: "View projects",
    },
    skills: [
      "UX / Product Design",
      "Wireframing",
      "Low / High-Fidelity Prototyping",
      "Usability Testing",
      "Heuristic Evaluation",
      "UX Research Synthesis",
      "Persona Development",
      "Task Analysis",
      "Accessibility (WCAG)",
      "User Testing & Insights",
      "Survey Design",
      "User Interviewing",
      "Thematic Analysis",
      "Metrics & Research KPIs",
      "Reporting & Presenting",
      "UI Design (Figma)",
      "Design Systems",
      "Component Libraries",
      "Responsive Design",
      "Developer Handoff",
      "JavaScript (ES6+)",
      "DOM Manipulation",
      "Responsive HTML / CSS",
      "React / Next.js",
      "UI Performance & Optimization",
      "Git / GitHub",
      "Agile / Scrum",
      "Stakeholder Communication",
      "Requirements Gathering",
      "Cross-Functional Collaboration",
      "UX Documentation & User Stories",
    ],
    work: {
      banner: "Featured Work",
      items: [
        {
          slug: "wt-186",
          title: "WT-186",
          role: "Wave-terrain synthesizer plugin",
          headline:
            "Turns uploaded image and audio files into dynamic sound through drag-and-drop integration.",
          meta: "UX/UI Design · Interaction Design",
          tag: "Case Study",
          tags: [
            "UX / Product Design",
            "UI Design (Figma)",
            "Low / High-Fidelity Prototyping",
            "DOM Manipulation",
            "JavaScript (ES6+)",
            "Responsive HTML / CSS",
            "UI Performance & Optimization",
            "Developer Handoff",
            "Cross-Functional Collaboration",
          ],
          href: "/wt186",
          ctaLabel: "Read case study",
          cover: "/images/wt186/splash3.png",
        },
        {
          slug: "ebehoerde",
          title: "eBehörde",
          role: "Digital government platform",
          headline:
            "A digital platform designed to make it easier for citizens to interact with government agencies in Germany.",
          meta: "UX/UI Design · Service Design",
          tag: "Case Study",
          tags: [
            "UX / Product Design",
            "Accessibility (WCAG)",
            "UX Research Synthesis",
            "User Testing & Insights",
            "Persona Development",
            "Task Analysis",
            "Wireframing",
            "Usability Testing",
            "Heuristic Evaluation",
            "Survey Design",
            "User Interviewing",
            "Thematic Analysis",
            "Metrics & Research KPIs",
            "Reporting & Presenting",
            "UI Design (Figma)",
            "Responsive Design",
            "Requirements Gathering",
            "UX Documentation & User Stories",
          ],
          href: "/ebehoerde",
          ctaLabel: "Read case study",
          cover: "/images/ebehoerde-cover.png",
        },
        {
          slug: "planora",
          title: "Planora",
          role: "Travel app",
          headline:
            "Brings every detail of a trip into one place — from notes and saved spots to organizing day trips and timing.",
          meta: "UX/UI Design · Mobile",
          tag: "Case Study",
          tags: [
            "UX / Product Design",
            "Low / High-Fidelity Prototyping",
            "User Interviewing",
            "Survey Design",
            "Design Systems",
            "Component Libraries",
            "Responsive Design",
            "Developer Handoff",
            "Agile / Scrum",
            "Stakeholder Communication",
          ],
          href: "/planora",
          ctaLabel: "Read case study",
          cover: "/images/planora/cover.png",
        },
        {
          slug: "flavor-fusion",
          title: "Flavor Fusion",
          role: "Recipe app landing page",
          headline: "A landing page bringing recipe discovery and relaxed cooking together.",
          meta: "UX/UI Design · Landing Page",
          tag: "Case Study",
          tags: [
            "UX / Product Design",
            "UI Design (Figma)",
            "Responsive Design",
            "React / Next.js",
            "Responsive HTML / CSS",
            "Component Libraries",
            "Design Systems",
          ],
          href: "/flavor-fusion",
          ctaLabel: "Read case study",
          cover: "/images/flavor-fusion/cover.png",
        },
        {
          slug: "experimental-audio-encoder",
          title: "NOISE-CODEC",
          role: "Experimental audio codec",
          headline:
            "Turns sound into a line of text and back into sound — four encoding algorithms, entirely in the browser.",
          meta: "Interaction Design · Web Audio",
          tag: "Website",
          tags: [
            "JavaScript (ES6+)",
            "DOM Manipulation",
            "Responsive HTML / CSS",
            "UI Performance & Optimization",
            "React / Next.js",
            "Git / GitHub",
          ],
          href: "/codec.html",
          ctaLabel: "Visit website",
          cover: "/images/NOISE-CODEC v6.0/2.png",
          external: true,
        },
      ],
    },
    footer: {
      navTitle: "Navigation",
      contactTitle: "Contact",
      rights: "All rights reserved.",
    },
    caseStudies: {
      ebehoerde: {
        back: "Back to overview",
        role: "Digital government platform",
        tags: ["UX/UI Design", "Service Design"],
      },
      planora: {
        back: "Back to overview",
        role: "Travel app",
        tags: ["UX/UI Design", "Mobile"],
      },
      flavorFusion: {
        back: "Back to overview",
        role: "Recipe app landing page",
        tags: ["UX/UI Design", "Landing Page"],
      },
      Wt186: {
        back: "Back to overview",
        role: "Wave-terrain synthesizer plugin",
        tags: ["UX/UI Design", "Interaction Design"],
      },
    },
  },
}
