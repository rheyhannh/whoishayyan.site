import Script from 'next/script'
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/provider/Theme'
import './_globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--poppins-font',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = /** @type {import('next').Metadata} */ ({
  title: 'Who is Hayyan',
  description: 'Reyhan Naufal Hayyan is a passionate final-year Computer Engineering student at the University of Brawijaya, specializing in web application development with React and Next.js. Beyond programming, he has a keen interest in the crypto space and share insightful crypto market analysis.',
  keywords: [
    'Personal Website',
    'Reyhan Naufal Hayyan',
    'Fullstack Developer',
    'Crypto Market Analysis',
    'Computer Engineering',
    'Brawijaya University',
  ],
  author: 'Reyhan Naufal Hayyan',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>

      {process.env.NODE_ENV === 'production' && (
        <Script
          strategy='afterInteractive'
          src="https://cloud.umami.is/script.js"
          data-website-id="08096a40-e37d-4393-8385-aa13afc80be2" />
      )}
    </html>
  )
}
