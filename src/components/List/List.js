import { useState } from "react";
import { createItem, removeItemFromList } from "../../API/api";
import ListItem from "../ListItem/ListItem";
import { useParseQuery } from "@parse/react";
import Parse from "parse";
import "./List.css";

const List = ({list, handleDelete}) => {
  const [hidden, setHidden] = useState(false)
  const [input, setInput] = useState("");

  const parseQuery = new Parse.Query("Item")
  parseQuery.equalTo("lists", list)
  parseQuery.ascending("createdAt");
  parseQuery.includeAll();

  const { isLive, isLoading, isSyncing, results, count, error, reload } =
    useParseQuery(parseQuery, {
      enableLocalDatastore: true, // Enables cache in local datastore (default: true)
      enableLiveQuery: true, // Enables live query for real-time update (default: true)
    });

  function handleChange(event) {
    setInput(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const itemId = await createItem(input, list)
    if (itemId) {
      setInput("");
    } else {
      console.log("Something went wrong")
    }
  }

  async function deleteItem(itemId) {
    const success = await removeItemFromList(itemId, list)
    if (success) {
    } else {
      console.log("Something went wrong")
    }
  }

  function handleHideClick() {
    setHidden(prevState => !prevState)
  }

    return (
    <div className="list-wrapper">
      <h2>{list.get("name")}</h2> <button className="delete-item-button" onClick={() => handleDelete(list)}>🗑️</button>
      <button className="hide-button" onClick={handleHideClick}>{hidden ? "Show" : "Hide"} list</button>
      {
        !hidden &&
        <div className="">
        <form className="input-form" onSubmit={handleSubmit}>
          <input className="input-field" type="text" value={input} onChange={handleChange} />
          <input className="submit-button" type="submit" />
        </form>
        <ul className="list">
          { results ? results.map((item) => (
            <ListItem key={item.id} name={item.get("name")} id={item.id} deleteItem={deleteItem} />
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
