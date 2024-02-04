import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

type SuccessProps = {
  customerName: string,
  product: {
    name: string,
    imageUrl: string,
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        {/* para os crowlers nao indexarem essa pagina */}
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={120} height={110} />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  /* redirecionamento pelo lado do servidor quando um ID não for informado. */
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      }
    }
  }
}

/* podemos escolher a forma de fetch de dados de 3 formas */
/* Client-side com axios/useEffect - nao vamos utilizar pq nao é seguro, pelo
fato da requisição ser feitra pelo lado do clientInformation, e como utilizamos chaves
privadas do stripe isso nao é possivel pelo fato da segurança dos dados senciveis */
// getServerSideProps - VAMOS UTILIZAR ELE
/* getStaticProps - nao podemos utilizar. pq os dados q vem pelo parametro da
rora sao dinamicos */