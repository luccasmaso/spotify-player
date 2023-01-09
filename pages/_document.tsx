import { Html, Head, Main, NextScript } from 'next/document'

import fonts from './_fonts'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Shotgun Spotify" />
      </Head>
      <body className={fonts()}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}