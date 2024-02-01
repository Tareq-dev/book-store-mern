import { loadStripe } from "@stripe/stripe-js";

export const makePayment = async (findingDetails) => {
  const stripe = await loadStripe(
    "pk_test_51OU8fJF563BZnYrDcKmymj3RJaO1OQWZ9ov5F8RSz7Wddo8ny6JpohOw2dPJZO3UOKjdFa6rbGX3qHQ9dTcV2RZn00Vw0YIvPb"
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
