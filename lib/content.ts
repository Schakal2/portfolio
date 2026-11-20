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
    pangea: CaseStudyCopy
    Wt186: CaseStudyCopy
    meintee: CaseStudyCopy
    evenly: CaseStudyCopy
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
        "Julian Wegner ist UX/UI Designer mit Hintergrund in Web-Development. Portfolio mit Case Studies und Projekten.",
    },
    nav: { home: "Home", work: "Projekte", contact: "Kontakt", cv: "CV" },
    hero: {
      banner: "Willkommen",
      heading: "Hi, ich bin Julian.",
      bio: "UX/UI-Designer, der die Lücke zwischen Interface-Design und sauberem Frontend-Code schließt.",
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
      "Design Systems",
      "Responsive Design",
      "JavaScript",
      "HTML / CSS",
      "React / Next.js",
      "Git / GitHub",
      "Agile / Scrum",
      "UX Requirements"
    ],
    work: {
      banner: "Ausgewählte Arbeiten",
      items: [
        {
          slug: "pangea",
          title: "Pangea",
          role: "Musik-App im Browser",
          headline:
            "Ein PO-33 mit dem Multiplayer von Figma: Pads, Loops und Tape am Handy, live mit Freunden. Der ganze Prozess, auch die Umwege.",
          meta: "UX/UI Design · Research · Frontend",
          tag: "Work in Progress",
          tags: ["UX Design", "Product Design", "UX Research", "Persona", "Wireframing", "Design Systems", "React / Next.js", "Responsive Design"],
          href: "/pangea",
          ctaLabel: "Case Study lesen",
          cover: "/images/pangea/cover-card.jpg",
        },
        {
          slug: "meintee",
          title: "meinTee",
          role: "Shopify-Shop für Tee-Sets",
          headline:
            "Neu in Shopify, mit UX-Blick: wie aus technischen Tickets bessere Momente für Kund:innen wurden.",
          meta: "UX · Frontend · Shopify",
          tag: "Case Study",
          tags: ["JavaScript", "HTML / CSS", "Responsive Design", "Accessibility (WCAG)", "Web Design"],
          href: "/meintee",
          ctaLabel: "Case Study lesen",
          cover: "/images/meintee/cover-v3.jpg",
        },
        {
          slug: "evenly",
          title: "Evenly",
          role: "Ausgaben-Teilen-App",
          headline:
            "Kosten in der Gruppe fair teilen, ohne Konto und ohne Datenhandel.",
          meta: "UX/UI Design · Frontend · Mobile Web",
          tag: "Eigenes Projekt",
          tags: ["UX Design", "Product Design", "Web Design", "JavaScript", "HTML / CSS", "Responsive Design"],
          href: "/evenly",
          ctaLabel: "Case Study lesen",
          cover: "/images/evenly/cover.jpg",
        },
        {
          slug: "wt-186",
          title: "WT-186",
          role: "Wave-Terrain-Synthesizer-Plugin",
          headline:
            "Verwandelt hochgeladene Bild- und Audiodateien per Drag-and-Drop in dynamischen Klang.",
          meta: "UX/UI Design · Interaction Design",
          tag: "Audio Plug-In",
          tags: [
            "UX Design",
            "Product Design",
            "UI Design (Figma)",
            "Low / High-Fidelity Prototyping",
            "JavaScript",
            "Responsive Design",
            "HTML / CSS",
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
            "UX Design",
            "Product Design",
            "Accessibility (WCAG)",
            "UX Research",
            "User Testing & Insights",
            "Persona",
            "Wireframing",
            "Usability Testing",
            "Survey Design",
            "User Interviewing",
            "UI Design (Figma)",
            "Responsive Design",
            "UX Requirements",
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
            "UX Design",
            "Product Design",
            "Low / High-Fidelity Prototyping",
            "User Interviewing",
            "UX Research",
            "Persona",
            "Survey Design",
            "Design Systems",
            "Responsive Design",
            "Agile / Scrum",
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
            "JavaScript",
            "Responsive Design",
            "HTML / CSS",
            "React / Next.js",
            "Git / GitHub",
            "Web Design",
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
            "UX Design",
            "Product Design",
            "UI Design (Figma)",
            "Responsive Design",
            "React / Next.js",
            "HTML / CSS",
            "Design Systems",
            "Web Design",
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
      pangea: {
        back: "Zurück zur Übersicht",
        role: "Musik-App im Browser · Work in Progress",
        tags: ["UX/UI Design", "Research", "Frontend"],
      },
      evenly: {
        back: "Zurück zur Übersicht",
        role: "Ausgaben-Teilen-App",
        tags: ["UX/UI Design", "Frontend", "Mobile"],
      },
      meintee: {
        back: "Zurück zur Übersicht",
        role: "Shopify-Shop für Tee-Sets",
        tags: ["UX", "Frontend", "Shopify"],
      },
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
      heading: "Hi, I'm Julian.",
      bio: "UX/UI designer bridging the gap between interface design and clean frontend code.",
      cta: "View projects",
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
      "Design Systems",
      "Responsive Design",
      "JavaScript",
      "HTML / CSS",
      "React / Next.js",
      "Git / GitHub",
      "Agile / Scrum",
      "UX Requirements",
    ],
    work: {
      banner: "Featured Work",
      items: [
        {
          slug: "pangea",
          title: "Pangea",
          role: "Music app in the browser",
          headline:
            "A PO-33 with the multiplayer of Figma: pads, loops and tape on your phone, live with friends. The whole process, detours included.",
          meta: "UX/UI Design · Research · Frontend",
          tag: "Work in Progress",
          tags: ["UX Design", "Product Design", "UX Research", "Persona", "Wireframing", "Design Systems", "React / Next.js", "Responsive Design"],
          href: "/pangea",
          ctaLabel: "Read case study",
          cover: "/images/pangea/cover-card.jpg",
        },
        {
          slug: "meintee",
          title: "meinTee",
          role: "Shopify store for tea sets",
          headline:
            "New to Shopify, with a UX lens: turning technical tickets into better moments for customers.",
          meta: "UX · Frontend · Shopify",
          tag: "Case Study",
          tags: ["JavaScript", "HTML / CSS", "Responsive Design", "Accessibility (WCAG)", "Web Design"],
          href: "/meintee",
          ctaLabel: "Read case study",
          cover: "/images/meintee/cover-v3.jpg",
        },
        {
          slug: "evenly",
          title: "Evenly",
          role: "Expense splitting app",
          headline:
            "Split group costs fairly, without accounts and without selling data.",
          meta: "UX/UI Design · Frontend · Mobile Web",
          tag: "Personal project",
          tags: ["UX Design", "Product Design", "Web Design", "JavaScript", "HTML / CSS", "Responsive Design"],
          href: "/evenly",
          ctaLabel: "Read case study",
          cover: "/images/evenly/cover.jpg",
        },
        {
          slug: "wt-186",
          title: "WT-186",
          role: "Wave-terrain synthesizer plugin",
          headline:
            "Turns uploaded image and audio files into dynamic sound through drag-and-drop integration.",
          meta: "UX/UI Design · Interaction Design",
          tag: "Case Study",
          tags: [
            "UX Design",
            "Product Design",
            "UI Design (Figma)",
            "Low / High-Fidelity Prototyping",
            "JavaScript",
            "Responsive Design",
            "HTML / CSS",
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
            "UX Design",
            "Product Design",
            "Accessibility (WCAG)",
            "UX Research",
            "User Testing & Insights",
            "Persona",
            "Wireframing",
            "Usability Testing",
            "Survey Design",
            "User Interviewing",
            "UI Design (Figma)",
            "Responsive Design",
            "UX Requirements",
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
            "UX Design",
            "Product Design",
            "Low / High-Fidelity Prototyping",
            "User Interviewing",
            "UX Research",
            "Persona",
            "Survey Design",
            "Design Systems",
            "Responsive Design",
            "Agile / Scrum",
          ],
          href: "/planora",
          ctaLabel: "Read case study",
          cover: "/images/planora/cover.png",
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
            "JavaScript",
            "Responsive Design",
            "HTML / CSS",
            "React / Next.js",
            "Git / GitHub",
            "Web Design",
          ],
          href: "/codec.html",
          ctaLabel: "Visit website",
          cover: "/images/NOISE-CODEC v6.0/2.png",
          external: true,
        },
        {
          slug: "flavor-fusion",
          title: "Flavor Fusion",
          role: "Recipe app landing page",
          headline: "A landing page bringing recipe discovery and relaxed cooking together.",
          meta: "UX/UI Design · Landing Page",
          tag: "Case Study",
          tags: [
            "UX Design",
            "Product Design",
            "UI Design (Figma)",
            "Responsive Design",
            "React / Next.js",
            "HTML / CSS",
            "Design Systems",
            "Web Design",
          ],
          href: "/flavor-fusion",
          ctaLabel: "Read case study",
          cover: "/images/flavor-fusion/cover.png",
        },
      ],
    },
    footer: {
      navTitle: "Navigation",
      contactTitle: "Contact",
      rights: "All rights reserved.",
    },
    caseStudies: {
      pangea: {
        back: "Back to overview",
        role: "Music app in the browser · Work in Progress",
        tags: ["UX/UI Design", "Research", "Frontend"],
      },
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
      evenly: {
        back: "Back to overview",
        role: "Expense splitting app",
        tags: ["UX/UI Design", "Frontend", "Mobile"],
      },
      meintee: {
        back: "Back to overview",
        role: "Shopify store for tea sets",
        tags: ["UX", "Frontend", "Shopify"],
      },
      Wt186: {
        back: "Back to overview",
        role: "Wave-terrain synthesizer plugin",
        tags: ["UX/UI Design", "Interaction Design"],
      },
    },
  },
}
