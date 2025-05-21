import "./globals.css"
import LandingPage from "./page"

export default function RootLayout({}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
        <div>
          <LandingPage/>
        </div>
      </body>
    </html>
  )
}