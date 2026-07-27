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
  cover?: string
  external?: boolean
}

export interface CaseStudySection {
  heading: string
  body: string
}

export interface CaseStudyCopy {
  back: string
  role: string
  intro: string
  tags: string[]
  sections?: CaseStudySection[]
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
          slug: "wt-186",
          title: "WT-186",
          role: "Wave-Terrain-Synthesizer-Plugin",
          headline:
            "Verwandelt hochgeladene Bild- und Audiodateien per Drag-and-Drop in dynamischen Klang.",
          meta: "UX/UI Design · Interaction Design",
          tag: "Audio Plug-In",
          href: "/wt186",
          ctaLabel: "Case Study lesen",
          cover: "/images/wt186/1.png",
        },
      {
          slug: "ebehoerde",
          title: "eBehörde",
          role: "Digitale Behördenplattform",
          headline:
            "Eine digitale Plattform, die die Interaktion zwischen Bürger:innen und Behörden in Deutschland erleichtert.",
          meta: "UX/UI Design · Service Design · Mobile",
          tag: "Case Study",
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
        intro:
          "WT-186 ist ein selbst entwickeltes Wave-Terrain-Synthesizer-Plug-in für die Musikproduktion — entstanden aus einem Studienhintergrund in Digital Signal Processing (DSP) und der Idee, Klangerzeugung visuell und intuitiv erlebbar zu machen.",
        tags: ["UX/UI Design", "Interaction Design"],
        sections: [
          {
            heading: "Vision & Konzept",
            body: "Die Erzählidee: ein abstraktes DSP-Konzept in physischer Realität verankern — mit den Höhendaten des Mount Everest entsteht ein organischer, weiträumiger Cosmic-Pad-Sound. Die Grundphilosophie dahinter: Ein visuelles Interface schafft eine intuitivere Verbindung zwischen dem, was einen Klang erzeugt, und wie diese Erzeugung sichtbar wird — statt sich im Menü zu verlieren.",
          },
          {
            heading: "Interface & Navigation",
            body: "Ein Dual-View-Feedback-Loop: das Sonar-LCD, ein kompaktes Display mit Fadenkreuz zur genauen Positionsanzeige — angelehnt an eine Sonar-Radar-Ästhetik, ohne mit rohen Höhendaten zu überfordern —, kombiniert mit der Terrain View, einer großen Visualisierung, die den Orbitalpfad als fließendes Band über die geografischen Höhendaten legt. Orbit-Mechanik und Sound-Shaping (ADSR, FX) sind klar voneinander getrennt, damit der Workflow musikerfreundlich bleibt.",
          },
          {
            heading: "Herausforderungen & Lösungen",
            body: "Feinsteuerung vs. Spielbarkeit: Der Orbital-Speed-Regler wurde in Grob- und Feineinstellung aufgeteilt, um einen extrem sensiblen Parameterbereich zu zähmen. Klangchaos bändigen: Da eine kleine Wellenform, die pro Zyklus riesige Terrain-Daten abtastet, schnell zu extremem Rauschen führt, dienen dedizierte FX- und Makro-Bereiche als kreative Leitplanken. Die Mod-Matrix neu gedacht: Statt einer sperrigen Grid-Seite läuft Modulation über die direkte Interaktion mit dem Morph-Button — Parameter leuchten beim Hover dezent auf und zeigen aktive Modulationen (LFOs, Hüllkurven), ohne den Screen zu überladen.",
          },
          {
            heading: "User-Testing & Validierung",
            body: "Die Validierung entwickelte sich von informellen Synth-Jams und Dogfooding hin zu strukturierten Nutzer:inneninterviews und Usability-Tests, mit Fokus auf drei Fragen: Sind die Drag-Affordanzen an den Reglern für neue Nutzer:innen sofort erkennbar? Kommunizieren modulierbare Knobs und Slider ihren Zustand auch ohne versteckte Einstellungsseite? Und wie gut lässt sich das Hover-basierte Licht-Modell auf unterschiedlicher Hardware entdecken?",
          },
        ],
      },
      ebehoerde: {
        back: "Zurück zur Übersicht",
        role: "Digitale Behördenplattform",
        intro:
          "eBehörde ist eine digitale Plattform, die entwickelt wurde, um die Interaktion der Bürgerinnen und Bürger mit den Behörden in Deutschland zu erleichtern. Entstanden als Capstone-Projekt der UX/UI-Weiterbildung bei neue fische — von der Nutzer:innen-Befragung bis zum fertigen Interface.",
        tags: ["UX/UI Design", "Service Design"],
      },
      planora: {
        back: "Zurück zur Übersicht",
        role: "Reise-App",
        intro:
          "Planora vereint jedes Detail einer Reise an einem Ort — vom Notizenmachen über gespeicherte Orte bis zur Organisation von Tagesausflügen und Reisezeiten. Entstanden während der UX/UI-Weiterbildung bei neue fische.",
        tags: ["UX/UI Design", "Mobile"],
      },
      flavorFusion: {
        back: "Zurück zur Übersicht",
        role: "Rezept-App Landingpage",
        intro:
          "FlavorFusion ist die Landingpage für eine Rezept-App: Rezepte entdecken, Einkaufslisten verwalten und mit dem Hands-free-Modus entspannt kochen, ohne das Handy anzufassen.",
        tags: ["UX/UI Design", "Landing Page"],
      },
    },
  },
  en: {
    meta: {
      title: "Julian Wegner — UX/UI Designer",
      description:
        "Julian Wegner is a UX/UI designer with a background in film production and web development. Portfolio with case studies and projects.",
    },
    nav: { home: "Home", work: "Work", contact: "Contact", cv: "CV" },
    hero: {
      banner: "Welcome",
      heading: "Hi, I'm Julian — a UX/UI designer who came up through set and code.",
      bio: "I design digital products that feel clear, usable, and have character. With a background in film production and web development, I bring structure and curiosity to every project.",
      cta: "View projects",
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
          cover: "/images/ebehoerde-cover.png",
        },
        {
          slug: "wt-186",
          title: "WT-186",
          role: "Wave-terrain synthesizer plugin",
          headline:
            "Turns uploaded image and audio files into dynamic sound through drag-and-drop integration.",
          meta: "UX/UI Design · Interaction Design",
          tag: "Case Study",
          href: "/wt186",
          ctaLabel: "Read case study",
          cover: "/images/wt186/1.png",
        },
        {
          slug: "planora",
          title: "Planora",
          role: "Travel app",
          headline:
            "Brings every detail of a trip into one place — from notes and saved spots to organizing day trips and timing.",
          meta: "UX/UI Design · Mobile",
          tag: "Case Study",
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
        intro:
          "eBehörde is a digital platform designed to make it easier for citizens to interact with government agencies in Germany. Built as the capstone project of a UX/UI training at neue fische — from user research to the final interface.",
        tags: ["UX/UI Design", "Service Design"],
      },
      planora: {
        back: "Back to overview",
        role: "Travel app",
        intro:
          "Planora brings every detail of a trip into one place — from notes and saved spots to organizing day trips and timing. Built during a UX/UI training at neue fische.",
        tags: ["UX/UI Design", "Mobile"],
      },
      flavorFusion: {
        back: "Back to overview",
        role: "Recipe app landing page",
        intro:
          "FlavorFusion is the landing page for a recipe app: discover recipes, manage shopping lists, and cook hands-free without touching your phone.",
        tags: ["UX/UI Design", "Landing Page"],
      },
      Wt186: {
        back: "Back to overview",
        role: "Wave-terrain synthesizer plugin",
        intro:
          "WT-186 is a custom-built wave terrain synthesizer plug-in for music production — grown out of a background in Digital Signal Processing (DSP) and the idea of making sound design visual and intuitive.",
        tags: ["UX/UI Design", "Interaction Design"],
        sections: [
          {
            heading: "Vision & Concept",
            body: "The narrative hook: grounding an abstract DSP concept in physical reality — Mount Everest's height data generates an organic, sweeping cosmic pad sound. The core philosophy: a visual interface creates a more intuitive connection between what shapes a sound and how that shaping is represented, instead of sterile menu-diving.",
          },
          {
            heading: "Interface & Navigation",
            body: "A dual-view feedback loop: the Sonar LCD, a compact screen with a crosshair marking the current position — echoing a sonar-radar aesthetic without overwhelming the user with raw height data — paired with the Terrain View, a larger visualization showing the orbital path as a flowing ribbon across the geographic terrain data. Orbit mechanics and sound-shaping (ADSR, FX) live in clearly separated sections to keep the workflow musician-friendly.",
          },
          {
            heading: "Challenges & Solutions",
            body: "Granular control vs. playability: the orbital Speed fader was split into coarse and fine controls to tame an extremely sensitive parameter range. Taming sonic chaos: because a small waveform sampling vast terrain data in one cycle risks extreme noise, dedicated FX and macro sections act as creative safety rails. Reinventing the mod matrix: instead of a cumbersome grid page, modulation runs through direct manipulation of the morph button, with parameters subtly lighting up on hover to reveal active modulations (LFOs, envelopes) without cluttering the screen.",
          },
          {
            heading: "User Testing & Validation",
            body: "Validation moved from informal synth jams and dogfooding to structured user interviews and usability tests, focused on three questions: are the drag affordances on handlers immediately clear to new users, do modulatable knobs and sliders communicate their state without a hidden settings page, and how discoverable is the hover-based lighting model across different hardware setups.",
          },
        ],
      },
    },
  },
}
