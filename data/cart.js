export let cart=JSON.parse(localStorage.getItem('cart')) || [
    {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 2, deliveryOptionId: '2'},
    {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1, deliveryOptionId: '3'}
];

export function addToCart(productId){
    let matchingItem;
    const quantity=Number(document.querySelector(`.js-product-quantity-selector-${productId}`).value);
    let cartQuantity=quantity;
    cart.forEach((cartItem)=>{
        if(productId===cartItem.productId) matchingItem=cartItem;
        cartQuantity+=cartItem.quantity;
    });
    if(matchingItem){
        matchingItem.quantity+=quantity;
    }
    else{
        cart.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
        });
    }
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
    saveCart();
    console.log(cart);
    console.log(cartQuantity);
}
export function updateCartItem(productId,deliveryOptionId){
    const cartItem=cart.find(item=>item.productId==productId);
    cartItem.deliveryOptionId=deliveryOptionId;
    saveCart();
}
function saveCart(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
