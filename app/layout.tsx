import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FD2023 - Alexandre JORGE',
  description: 'FD2023 - React component - Alexandre JORGE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>{metadata.title}</h1>
        </header>
        {children}
        </body>
    </html>
  )
}
