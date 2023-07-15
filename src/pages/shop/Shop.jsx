import React, { useEffect } from "react";
import { PRODUCTS } from "../../products";
import Product from "./Product";
import "./Shop.css";
import axios from "axios";

const Shop = () => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="shop">
      <div className="shop-title">
        <h1>Axia Shop</h1>
      </div>
      <div className="products">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
