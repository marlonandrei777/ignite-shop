import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceId } = req.body;

  // para evitar q a rota seja chamada por GET pelo navegador
  if (req.method !== "POST")
    if (!priceId) {
      // tratamento do error
      return res.status(400).json({ error: "Price not found" });
    }

  const successUrl = `${process.env.NEXT_URL}/success`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    /* url de sucesso */
    success_url: successUrl,
    /* url de cancelamento */
    cancel_url: cancelUrl,
    /* modo de checkout */
    mode: "payment",
    /* array q tem varias info sobre quais produtos o usuario ta comprando */
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  // redirecionamento para a url onde o usuario vai finalizar a compra
  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
