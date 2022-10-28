import { useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./ProductList.css";

const ProductList = () => {
  const [input, setInput] = useState("");
  const [productList, setProductList] = useState([
    "Cabbage",
    "Carrots",
    "Strawberries",
    "Tide pods",
    "Dahl",
    "Cabbage",
    "A Tesla",
  ]);

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setProductList((prevState) => [...prevState, input]);
    setInput("");
  }

  function deleteItem(index) {
    setProductList( prevState => [...prevState.filter( (item, i) => i !== index )])
  }

  return (
    <div className="list-wrapper">
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <input type="submit" />
      </form>
      <ul className="list">
        {productList.map((item, index) => (
          <ListItem key={index} item={item} index={index} deleteItem={deleteItem} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
