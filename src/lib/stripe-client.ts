import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey =
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      "pk_test_51SuG1QDh0uKTGDpvKSBo7AVOnHG17FTyREz7RgP5DIgRikC10IoRrJpDsVBisnxSkQAl7ZK3kXYY1uWRvpM6GGLC00TLAW6RgW";
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};
