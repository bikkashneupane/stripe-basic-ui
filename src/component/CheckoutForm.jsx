import { useState } from "react";
import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const [form, setForm] = useState({});
  const stripe = useStripe();
  const element = useElements();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // 1. Initiate the payment
    const payload = {
      amount: 25,
      currency: "aud",
      paymentMethod: "card",
    };

    const apiEP = "http://localhost:3000/create-stripe-paymet";

    // 2. call payment initiatio  api
    const { data } = await axios.post(apiEP, payload);

    // 3. capture client secrete
    console.log(data);

    const response = await stripe.confirmCardPayment(data.clientSecrete, {
      payment_method: {
        card: element.getElement(CardElement),
        billing_details: {
          name: form.name,
          email: form.email,
        },
      },
    });

    console.log(response.paymentIntent);
    console.log(response.paymentIntent.id);

    if (response.paymentIntent.status === "succeeded") {
      alert("Payment Success");
      const confirmEP = "http://localhost:3000/confirm-order";
      const res = await axios.post(confirmEP, response.paymentIntent);
    }
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleOnChange}
          />
        </div>

        <div>
          Email:{" "}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleOnChange}
          />
        </div>
        <CardElement />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
