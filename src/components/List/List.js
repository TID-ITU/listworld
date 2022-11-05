import { useState, useEffect } from "react";
import { createItem, deleteList, getList, removeItemFromList } from "../../API/api";
import ListItem from "../ListItem/ListItem";
import "./List.css";

const List = ({id, handleDelete}) => {
  const [hidden, setHidden] = useState(false)
  const [input, setInput] = useState("");
  const [list, setList] = useState({name: "", items: []});

  useEffect( () => {
    // if (list.name.length === 0) {
      const getData = async () => {
        const l = await getList(id)
        setList(l)
        console.log(l)
      }
      getData()
    // }
  },[id])

  function handleChange(event) {
    setInput(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const itemId = await createItem(input, id)
    if (itemId) {
      setList((prevState) => {return {name: prevState.name, items: [...prevState.items, {name: input, id: itemId}]}});
      setInput("");
    } else {
      console.log("Something went wrong")
    }
  }

  async function deleteItem(itemId) {
    const success = await removeItemFromList(itemId, id)
    if (success) {
      setList( prevState => {return {name: prevState.name, items: [...prevState.items.filter( ({id}) => id !== itemId )]}})
    } else {
      console.log("Something went wrong")
    }
  }

  function handleHideClick() {
    setHidden(prevState => !prevState)
  }

    return (
    <div className="list-wrapper">
      <h2>{list.name.length > 0 ? list.name : "Loading..."}</h2> <button className="delete-item-button" onClick={() => handleDelete(id)}>🗑️</button>
      <button className="hide-button" onClick={handleHideClick}>{hidden ? "Show" : "Hide"} list</button>
      {
        !hidden &&
        <div className="">
        <form className="input-form" onSubmit={handleSubmit}>
          <input className="input-field" type="text" value={input} onChange={handleChange} />
          <input className="submit-button" type="submit" />
        </form>
        <ul className="list">
          { list.items.length > 0 ? list.items.map(({name, id}) => (
            <ListItem key={id} name={name} id={id} deleteItem={deleteItem} />
            ))
          : <h2>No items in the list.</h2>
          }
        </ul>
      </div>
    }
    </div>
  );
};

export default List;
