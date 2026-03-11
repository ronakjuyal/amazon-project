import { cart, removeFromCart, updateCart, updateCartItem } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){
    let cartListHTML='';
    cart.forEach((cartItem)=>{
        let product=products.find(item=>item.id===cartItem.productId);
        const date=dayjs().add(deliveryOptions.find(option=>option.id===cartItem.deliveryOptionId).deliveryDays,'days').format('dddd, MMMM D');
        cartListHTML+=`
            <div class="cart-item-container js-cart-item-container-${product.id}">
                <div class="delivery-date">
                Delivery date: ${date}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${product.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${product.name}
                    </div>
                    <div class="product-price">
                    ${(product.priceCents/100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${product.id}">
                        Update
                    </span>
                    <input class="quantity-input js-quantity-input-${product.id}">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${product.id}">
                        Save
                    </span>

                    <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${cartItem.productId}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${renderDeliveryOptions(cartItem.productId,cartItem.deliveryOptionId)}
                </div>
                </div>
            </div>`;
    });
    document.querySelector('.js-order-summary').innerHTML=cartListHTML;
    document.querySelectorAll('.js-delivery-option-input').forEach((option)=>{
        let {productId,deliveryOptionId}=option.dataset;
        option.addEventListener('click',()=>{
            updateCartItem(productId,deliveryOptionId)
            renderOrderSummary();
            renderPaymentSummary();
        });

    });
    document.querySelectorAll('.js-delete-quantity-link').forEach((deleteButton)=>{
        deleteButton.addEventListener('click',()=>{
            const productId=deleteButton.dataset.productId;
            removeFromCart(productId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
    document.querySelectorAll('.js-update-link').forEach((updateButton)=>{
        updateButton.addEventListener('click',()=>{
            const productId = updateButton.dataset.productId;
            document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
        });
    });
    document.querySelectorAll('.js-save-link').forEach((saveButton)=>{
        saveButton.addEventListener('click',()=>{
            const productId = saveButton.dataset.productId;
            const newQuantity=Number(document.querySelector(`.js-quantity-input-${productId}`).value);
            updateCart(productId,newQuantity);
            document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
function renderDeliveryOptions(productId,deliveryOptionId){
    let optionListHTML='';
    
    deliveryOptions.forEach((option)=>{
        const date=dayjs().add(option.deliveryDays,'days').format('dddd, MMMM D');
        optionListHTML+=`
            <div class="delivery-option">
                <input type="radio" ${deliveryOptionId===option.id?"checked":""} class="delivery-option-input js-delivery-option-input" name="delivery-option-${productId}" data-product-id="${productId}" data-delivery-option-id="${option.id}">
                <div>
                    <div class="delivery-option-date">
                    ${date}
                    </div>
                    <div class="delivery-option-price">
                    ${option.priceCents==0?'FREE ': '$ '+(option.priceCents/100).toFixed(2)+' -'} Shipping
                    </div>
                </div>
            </div>`;
    });
    return optionListHTML;
}