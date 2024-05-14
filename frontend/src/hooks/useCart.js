import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { sample_foods } from "../data";

const CartContext = createContext(null);

// local storage
const CART_KEY = 'cart';
const EMPTY_CART = {
  items:[],
  totalPrice: 0,
  totalCount: 0,
};
export default function CartProvider({ children }) {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  useEffect(() =>{
    const totalPrice = sum(cartItems.map(item =>item.price));
    const totalCount = sum(cartItems.map(item => item.quantity));
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
      })
    );
  },[cartItems]);

// local storage  
  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  const sum = items =>{
    return items.reduce((prevValue,curValue) => prevValue + curValue,0);
  };

  const removeFromCart = foodId=>{
    const filteredCarditems = cartItems.filter(item => item.food.id !== foodId);
    setCartItems(filteredCarditems);
  }

  const changeQuantity = (cartItem,newQuantity) =>{
    const {food} = cartItem;
    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity,
    };
    setCartItems(
      cartItems.map(item => (item.food.id === food.id ? changedCartItem : item))
    );
  }

  const addToCart = food =>{
    const cartItem = cartItems.find(item => item.food.id === food.id);
    if(cartItem){
      changeQuantity(cartItem,cartItem.quantity+1);
    }else{
      setCartItems([
        ...cartItems,
        {
          food,
          quantity: 1,
          price: food.price
        }
      ])
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,changeQuantity,addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);