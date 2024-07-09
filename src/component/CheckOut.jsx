import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePublicKey = loadStripe(
  "pk_test_51PaSRURr5bu3DUEzVDvqsbK6uYwQ3X5w5tuuEiRKyHLqTihtZpVzl1bEUAWPZTw54agbJAcHVW0TjAPODpoHfdvU00E3jQdIt9"
);

const CheckOut = () => {
  return (
    <div>
      <div>Cart Total: $25</div>
      <hr />
      <Elements stripe={stripePublicKey}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckOut;
