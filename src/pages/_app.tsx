import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { SkeletonTheme } from 'react-loading-skeleton';
import logoImg from '../assets/logo.svg'
import Image from 'next/image';
import { Container, Header } from '@/styles/pages/app';

/* add o globalStyle fora da funcao App para a funcao globalStyles()
nao executar toda vez q App recarregar, assim a funcao globalStyles()
executará apenas 1x */
globalStyles();

/* dentro de App vamos colocar componentes q se repetem em todas as telas
como um header por ex */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SkeletonTheme>
      <Container>
        <Header>
          {/* coponente de img importada do next */}
          <Image src={logoImg} alt='Logo Ignite Shop' />
        </Header>

        <Component {...pageProps} />
      </Container>
    </SkeletonTheme>
  );
}
