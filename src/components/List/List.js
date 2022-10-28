import { useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./List.css";

/*
1 If statement
if (condition) {code}
2 Ternary operator
condition ? code if true : code if false
3 And operator &&
true && true => true
true && code => code
condition && code
*/


const List = ({name}) => {
  const condition = false
  const [hidden, setHidden] = useState(false)
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

  function handleHideClick() {
    setHidden(prevState => !prevState)
  }

  if (condition) { 
    return (
    <div className="list-wrapper">
      <h2>{name}</h2>
      <button className="hide-button" onClick={handleHideClick}>{hidden ? "Show" : "Hide"} list</button>
      {
        !hidden &&
        <div className="list-content">
        <form className="input-form" onSubmit={handleSubmit}>
          <input className="input-field" type="text" value={input} onChange={handleChange} />
          <input className="submit-button" type="submit" />
        </form>
        <ul className="list">
          { list.length > 0 ? list.map((item, index) => (
            <ListItem key={index} item={item} index={index} deleteItem={deleteItem} />
            ))
          : <h2>No items in the list.</h2>
          }
        </ul>
      </div>
      }


        </div>
      );
  } else {
    return <h1>Nothing to see here!</h1>
  }

  if (otherCondition) {
    return
  }
};

export default List;
