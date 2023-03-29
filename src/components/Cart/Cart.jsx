import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const {cart} = props;

    let totalPrice = 0, shipping = 0, quantity=0;
    for(const prodcut of cart){

        // if(prodcut.quantity == 0){
        //     prodcut.quantity = 1;
        // }
        // prodcut.quantity = prodcut.quantity || 1;
        totalPrice = totalPrice + prodcut.price * prodcut.quantity;
        shipping += prodcut.shipping;
        quantity += prodcut.quantity;
    }

    const tax = totalPrice * 7 / 100;

    const grandTotal = totalPrice + shipping + tax;
    return (
        <div className='cart'>
            <h4>Order summary</h4>
            <h3>selected item : {quantity}</h3>
            <p>Total Price: {totalPrice}</p>
            <p>Total Shipping: {shipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h6>Grand Total: {grandTotal.toFixed(2)}</h6>
        </div>
    );
};

export default Cart;