import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import Image from "next/image";
import { SkeletonProduct } from "@/components/skeletonProduct";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";

type ProductProps = {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    defaultPriceId: string,
  }
}

export default function Product({ product }: ProductProps) {
  // para desabiitar o botao de compra na hora do click
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        // parametros q eu quero enviar
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data

      // redirecionando usuario para uma rota externa
      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com alguma ferramenta de observabilidade (datadog / sentry)

      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const { isFallback } = useRouter()

  // quando o isfallBack for true, vamos mostrar o loading
  if (isFallback) {
    return <SkeletonProduct />
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

// ssg com parametros dinamicos
export const getStaticPaths: GetStaticPaths = async () => {
  // precisamos retornar um objeto onde dentro dele vai ter um array
  /* esse array precisa ter varios objetos, onde cada um retona os parametros
  dos produtos q queremos gerar essa versao statica */
  return {
    /* quais sao os parametros/id do produto q queremos q 
    ele gere uma versao estatica no momento da build*/
    paths: [
      { params: { id: 'prod_OsCDCkP7noL21L' } }
    ],
    fallback: true
  }
}

// Chamada API - SSG
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  // bucando os dados do produto
  const productId = params.id;

  // buscando o produto de dentro do stripe
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        // formatando o preço
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 Hours
  }
}