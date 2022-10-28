import { useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./List.css";

const List = ({name}) => {

  const [input, setInput] = useState("");
  const [list, setList] = useState([
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
    setList((prevState) => [...prevState, input]);
    setInput("");
  }

  function deleteItem(index) {
    setList( prevState => [...prevState.filter( (item, i) => i !== index )])
  }

  return (
    <div className="list-wrapper">
      <h2>{name}</h2>
      <div className="list-content">
        <form className="input-form" onSubmit={handleSubmit}>
          <input className="input-field" type="text" value={input} onChange={handleChange} />
          <input className="submit-button" type="submit" />
        </form>
        <ul className="list">
          {list.map((item, index) => (
            <ListItem key={index} item={item} index={index} deleteItem={deleteItem} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
