import React, { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";
import axios from "axios";

const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {

  // buat cartItems menjadi array
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // ambil cart dari api dan set ke cartItems
  useEffect(() => {
    // axios.put("http://localhost:3000/api/carts", {
    //   items:
    // });
    console.log(cartItems);
  }, [cartItems]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  // ubah fungsi addToCart menjadi seperti ini, dan ubah parameter dari itemId menjadi item (lempar 1 object cart)
  // 1. copy cartItem menjadi variable baru dengan spread array (agar terbuat array yang berbeda)
  // 2. findIndex cartItems by _id dari parameter
  // 3. jika ada maka cukup tambahkan qty dari element tersebut
  // 4. jika tidak ada maka push object tsb dengan qty 1
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  // kebalikan dari addToCart
  const removeCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeCart,
    updateCartItemCount,
    getTotalCartAmount,
  };

  console.log(cartItems);
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export { ShopContextProvider, ShopContext };
