import { getCssText } from '@/styles'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* colocamos aq dentro as fontes vindas do google fonts...
        e alteramos o crossorigin para crossOrigin="anonymous" */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

        {/* congiguracao stitches, SSR */}
        {/* o getCssText vai fazer: quando o usuario carregar a pagina, ela vai
        pelo lado do servidor next carregar essa pagina dentro desse servidor next,
        ver qual q é todo o codigo css pra pagina e retornar pra essa função, e
        em seguida escrever esse codigo css dentro da tag style */}
        <style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </Head>

      <body>
        {/*  O main seria basicamente a mesma coisa q temos no react tradicional
        <div id="app"></div>. Mas o main vai indicar para o next  qual lugar
        do html do documento da app vao o conteudo das paginas */}
        <Main />

        {/* o nextScript seria basicamente em qual local do html queremos carregar
        os scripts JS da pagina  */}
        <NextScript />
      </body>
    </Html>
  )
}
