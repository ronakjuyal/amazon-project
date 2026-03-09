export let cart=[];

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
        quantity: quantity
        });
    }
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
    console.log(cart);
    console.log(cartQuantity);
}
