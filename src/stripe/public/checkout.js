// A reference to Stripe.js initialized with a fake API key.
import axios from "axios";
import { bindActionCreators } from "redux";
import { BASE_URL } from "../../../src/api/base";
import { buyingCompleted } from "../../actions/cart.actions";
import { store } from "../../store";

// eslint-disable-next-line no-undef
const stripe = Stripe(
  "pk_test_51Ju6xDSHY9y2p2gcLNd345Cq1vJki4thgc6cBBQoNx3gqFBgMoRcUyE4rV6sRZxbLm5Q0qQHjsWkdWoIU19eKHxh00D17E8UvW"
);

export const orderProduct = async (productId) => {
  try {
    // 1) get checkout session
    const url = BASE_URL + "/orders/checkout-session/" + productId;
    const session = await axios(url);
    console.log(session);

    //2) create checkout form +

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    action.buyingComplete();
  } catch (e) {
    console.log(e);
    alert(e);
  }
};

// The items the customer wants to buy
// const items = [{ id: "xl-tshirt" }];

// let elements;

// initialize();
// checkStatus();

// document
//   .querySelector("#payment-form")
//   .addEventListener("submit", handleSubmit);

// // Fetches a payment intent and captures the client secret
// async function initialize() {
//   const response = await fetch("/create-payment-intent", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ items }),
//   });
//   const { clientSecret } = await response.json();

//   const appearance = {
//     theme: 'stripe',
//   };
//   elements = stripe.elements({ appearance, clientSecret });

//   const paymentElement = elements.create("payment");
//   paymentElement.mount("#payment-element");
// }

// async function handleSubmit(e) {
//   e.preventDefault();
//   setLoading(true);

//   const { error } = await stripe.confirmPayment({
//     elements,
//     confirmParams: {
//       // Make sure to change this to your payment completion page
//       return_url: "http://localhost:4242/checkout.html",
//     },
//   });

//   // This point will only be reached if there is an immediate error when
//   // confirming the payment. Otherwise, your customer will be redirected to
//   // your `return_url`. For some payment methods like iDEAL, your customer will
//   // be redirected to an intermediate site first to authorize the payment, then
//   // redirected to the `return_url`.
//   if (error.type === "card_error" || error.type === "validation_error") {
//     showMessage(error.message);
//   } else {
//     showMessage("An unexpected error occured.");
//   }

//   setLoading(false);
// }

// // Fetches the payment intent status after payment submission
// async function checkStatus() {
//   const clientSecret = new URLSearchParams(window.location.search).get(
//     "payment_intent_client_secret"
//   );

//   if (!clientSecret) {
//     return;
//   }

//   const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

//   switch (paymentIntent.status) {
//     case "succeeded":
//       showMessage("Payment succeeded!");
//       break;
//     case "processing":
//       showMessage("Your payment is processing.");
//       break;
//     case "requires_payment_method":
//       showMessage("Your payment was not successful, please try again.");
//       break;
//     default:
//       showMessage("Something went wrong.");
//       break;
//   }
// }

// // ------- UI helpers -------

// function showMessage(messageText) {
//   const messageContainer = document.querySelector("#payment-message");

//   messageContainer.classList.remove("hidden");
//   messageContainer.textContent = messageText;

//   setTimeout(function () {
//     messageContainer.classList.add("hidden");
//     messageText.textContent = "";
//   }, 4000);
// }

// // Show a spinner on payment submission
// function setLoading(isLoading) {
//   if (isLoading) {
//     // Disable the button and show a spinner
//     document.querySelector("#submit").disabled = true;
//     document.querySelector("#spinner").classList.remove("hidden");
//     document.querySelector("#button-text").classList.add("hidden");
//   } else {
//     document.querySelector("#submit").disabled = false;
//     document.querySelector("#spinner").classList.add("hidden");
//     document.querySelector("#button-text").classList.remove("hidden");
//   }
// }

export const action = bindActionCreators(
  {
    buyingComplete: buyingCompleted,
  },
  store.dispatch
);
