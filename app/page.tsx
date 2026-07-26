import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { FeaturedWork } from "@/components/featured-work"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <FeaturedWork />
      <SiteFooter />
    </>
  )
}
