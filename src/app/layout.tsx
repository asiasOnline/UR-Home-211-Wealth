import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "UR Home",
  icons: { icon: "/favicon.ico" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
