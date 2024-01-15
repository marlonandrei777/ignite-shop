import { styled } from "@/styles";

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch", // vai esticar pra ter o mesmo tamanho verticalmente
  gap: "4rem",

  maxWidth: 1180,
  margin: "0 auto",
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 576,
  height: 656,
  borderRadius: 8,
});

export const ProductDetails = styled("div", {
  marginTop: "1.625rem",

  display: "flex",
  flexDirection: "column",
});

export const SkeletonPriceProduct = styled("div", {
  marginTop: "1rem",
});

export const SkeletonDetailProduct = styled("div", {
  marginTop: "5rem",
});

export const SkeletonButtonProduct = styled("div", {
  marginTop: "auto",
});
