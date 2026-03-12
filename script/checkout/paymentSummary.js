import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";

export function renderPaymentSummary(){
    let totalQuantity=0;
    let totalPrice=0;
    let totalShipping=0;
    cart.forEach(item => {
        const quantity=item.quantity; 
        totalQuantity+= quantity;
        totalPrice+=quantity * products.find(product=>product.id===item.productId).priceCents;
        totalShipping+=deliveryOptions.find(option=>option.id===item.deliveryOptionId).priceCents;
    });
    let total=(Math.round(totalShipping+totalPrice))/100;
    let paymentSummaryHTML=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${(Math.round(totalPrice)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(Math.round(totalShipping)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${total.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(total*0.1).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(total*1.1).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
    document.querySelector('.js-return-to-home').innerHTML=totalQuantity;
    console.log(totalQuantity);
    console.log(totalPrice);
    console.log(totalShipping);
}