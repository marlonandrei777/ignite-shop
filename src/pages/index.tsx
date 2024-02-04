import Link from "next/link";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import 'keen-slider/keen-slider.min.css';

import { HomeContainer, Product } from "../styles/pages/home";
import { GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Head from "next/head";

type HomeProps = {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string
  }[] /* <-- pa dizer q é um array */
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} alt="" width={520} height={480} />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  )
}

// Chamada API - SSG
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  // transformacao dos dados
  // onde criamos uma nova lista, porem só com os dados q queremos
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      // formatando o preço
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100)
    }
  })

  /* com o revalidate, a cada 10s q uma pessoa acesssar a page
  o next por baixo dos panos vai criar uma nova versao dessa pagina. 
  E todos os usuarios q acessarem nesse intervalo de 10s, eles vao consumir
  um cash estatico uma versao estatica do html dessa pagina q já foi criada
  previamente por um acesso de um outro usuario*/
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 Hours
  }
}