import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../../utilities/fakedb';
import Cart from '../../Cart/Cart';
import Product from '../../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const shoppingCart = getShoppingCart();
        const savedCart = [];



        for (const id in shoppingCart) {
            const addedProduct = products.find(product => product.id === id);

            if (addedProduct) {
                const quantity = shoppingCart[id];
                addedProduct.quantity = quantity;

                savedCart.push(addedProduct);
            }

        }

        setCart(savedCart);
    }, [products])

    const handleAddTocart = (prodcut) => {
        // way 1
        //    const newCart = [...cart, prodcut];

        // way 2
        let newCart = [];
        const exists = cart.find(pd => pd.id === prodcut.id);
        if(!exists){
            prodcut.quantity = 1;
            newCart = [...cart, prodcut];
        }

        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== prodcut.id);
            newCart = [...remaining, exists];
        }


        setCart(newCart);
        addToDb(prodcut.id);
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddTocart={handleAddTocart}

                    >

                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;