import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

describe('test suite addToCart',()=>{
    it('adds an existing product to cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                quantity: 1, 
                deliveryOptionId: '3'
            }]);
        });
        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
    });
});