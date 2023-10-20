import './_globals.css'

export const metadata = {
  title: 'Who is Hayyan',
  description: 'Welcome to Hayyan Website',
  keywords: 'reyhan, naufal, hayyan, website, developer, frontend, backend, crypto, cryptocurrencies, blockchain, iot, computer, engineering',
  author: 'Reyhan Naufal Hayyan',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
