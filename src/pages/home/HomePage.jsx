import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header.jsx";
import "./HomePage.css";
import { ProductsGrid } from "./productsGrid.jsx";

export function HomePage({ cart , loadCart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getHomeData () {
      const response = await  axios.get("/api/products");
      setProducts(response.data);
    }
    getHomeData();
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
