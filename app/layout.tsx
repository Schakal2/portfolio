import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "UXUI Portfolio - Julian Wegner",
  description:
    "Julian Wegner - UX Writing Executive and UXUI Designer specializing in content design and digital transformations.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
