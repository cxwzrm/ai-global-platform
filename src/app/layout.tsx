import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Global Marketing Platform',
  description: 'AI驱动的全球化外贸营销平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
