import { useState, useEffect } from "react";
import { Product } from "./product";

const mock = [
  {
    id: 0,
    title: "prodotto 1",
    price: 0,
    image: "",
  },
  {
    id: 1,
    title: "prodotto 2",
    price: 0,
    image: "",
  },
  {
    id: 2,
    title: "prodotto 3",
    price: 0,
    image: "",
  },
];

export const List = ({category, search}) => {
  const [products, setProducts] = useState(mock);
  const [source, setSource] = useState([]);

  const getData = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products"
    );
    const data = await response.json();
    setSource(data);
    setProducts(data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect (() => {
    
    const filtered = source.filter((product) => { 
      if  (category === "everything") {
      return product;
    } else {
      return product.category === category;
    }
    });
    setProducts(filtered);
    console.log("la categoria ora è", category, filtered)
  }, [category]);



useEffect (() => {
    const filtered = source.filter((product) =>  
    product.title.toLowerCase().includes (search.toLowerCase())
    );
    setProducts(filtered);
  }, [search]);

  return (
    <section>
      <ul className="grid">
        {products.map((item, index) => (
          <li key =  {index}>
            <Product name = {item.title} price = {item.price} image={item.image}/>
          </li>
        ))}
      </ul>
    </section>
  );
};