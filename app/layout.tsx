import type { Metadata } from "next"
import { LocaleProvider } from "@/lib/locale-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Julian Wegner — UX/UI Designer",
  description:
    "Julian Wegner ist UX/UI Designer mit Hintergrund in Filmproduktion und Web-Development. Portfolio mit Case Studies und Projekten.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
