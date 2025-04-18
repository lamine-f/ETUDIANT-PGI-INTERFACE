import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <title>Portail des Résultats Académiques</title>
        <meta name="description" content="Portail des résultats académiques pour les étudiants" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          {/*<MockDataProvider>{children}</MockDataProvider>*/}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
