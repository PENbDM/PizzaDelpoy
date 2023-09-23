import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
export const FullPizza = () => {
  const [pizza, setPizza] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `http://localhost:4444/getpizza/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Error");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Loading...";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl}></img>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
