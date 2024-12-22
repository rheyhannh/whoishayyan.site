import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/provider/Theme'
import './_globals.css'

export const metadata = {
  title: 'Who is Hayyan',
  description: 'Welcome to Hayyan Website',
  keywords: 'reyhan, naufal, hayyan, website, developer, frontend, backend, crypto, cryptocurrencies, blockchain, iot, computer, engineering',
  author: 'Reyhan Naufal Hayyan',
}

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--poppins-font',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
