"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { FeaturedWork } from "@/components/featured-work"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const handleSelectSkill = (skill: string | null) => {
    if (skill === selectedSkill) {
      setSelectedSkill(null)
      return
    }

    setSelectedSkill(skill)

    if (skill) {
      setTimeout(() => {
        const workElement = document.getElementById("work")
        if (workElement) {
          workElement.scrollIntoView({ behavior: "smooth" })
        }
      }, 50)
    }
  }

  return (
    <>
      <SiteHeader />
      <Hero selectedSkill={selectedSkill} onSelectSkill={handleSelectSkill} />
      <FeaturedWork selectedSkill={selectedSkill} onSelectSkill={handleSelectSkill} />
      <SiteFooter />
    </>
  )
}
