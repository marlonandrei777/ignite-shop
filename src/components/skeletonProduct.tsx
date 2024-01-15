import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import { ImageContainer, ProductContainer, ProductDetails, SkeletonDetailProduct, SkeletonPriceProduct, SkeletonButtonProduct } from "./style";

export function SkeletonProduct() {
  return (
    <ProductContainer>
      <ImageContainer>
        <Skeleton width={558} height={654} baseColor="#202024" />
      </ImageContainer>

      <ProductDetails>
        <Skeleton height={40} baseColor="#202024" />

        <SkeletonPriceProduct>
          <Skeleton height={40} width={110} baseColor="#202024" />
        </SkeletonPriceProduct>

        <SkeletonDetailProduct>
          <Skeleton height={40} baseColor="#202024" />
        </SkeletonDetailProduct>

        <SkeletonButtonProduct>
          <Skeleton height={62} baseColor="#202024" />
        </SkeletonButtonProduct>
      </ProductDetails>
    </ProductContainer>
  );
}