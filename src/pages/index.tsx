import { styled } from "../styles"

// criamos uma const button q recebe o styled q é uma funcao
// essa funcao recebe como primeiro parametro qual é a tag HTML
// e o segundo parametro e um obj com estilizacoes
const Button = styled('button', {
  backgroundColor: '$green300'
})

export default function Home() {
  return (
    /* para utilizarmos o botao customizado a cima, utizamos ele
    igual a utilizacao do styledComponents, em forma de componente */
    <Button>Enviar</Button>
  )
}
