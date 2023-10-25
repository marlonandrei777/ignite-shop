import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",

  /* com o app info todas as chamadas q fizermos no stripe
  vao ficar um log no dashboard do stripe, e la vai aparecer
  o nome da aap q fez a requisicao  */
  appInfo: {
    name: "Ignite Shop",
  },
});
