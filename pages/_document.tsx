import { Html, Head, Main, NextScript } from 'next/document'
import fonts from './_fonts'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name='description' content='Shotgun Spotify' />
      </Head>
      <body className={`${fonts()} dark:bg-black dark:text-white dark:antialiased`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}