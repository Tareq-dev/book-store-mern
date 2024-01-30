import { loadStripe } from "@stripe/stripe-js";

export const makePayment = async (findingDetails) => {
  const stripe = await loadStripe(
    "pk_test_51L2G4sBmhlq91OcmM28zWFxrGlcdSXj1zS8BeHVC6Wmb7hnNORKQ7MhJyVY6nDQCua0L1bhsFX3w2xB6lnp1iTGe00CFqEoh15"
  );
  const body = {
    books: findingDetails,
  };
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(
    "http://localhost:5000/create-checkout-session",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );
  const session = await response.json();

  console.log(session);
  const result = stripe.redirectToCheckout({
    sessionId: session.id,
  });
  if (result.error) {
    console.log(result.error);
  }
  console.log(result);
};
