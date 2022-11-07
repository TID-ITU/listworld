import { useState } from "react";
import { createItem, deleteItem } from "../../API/api";
import ListItem from "../ListItem/ListItem";
import Parse from "parse";
import {useParseQuery} from '@parse/react'
import "./List.css";

const List = ({list, deleteList}) => {
  const [input, setInput] = useState("");

  const parseQuery = new Parse.Query("Item")
  parseQuery.equalTo("list", list)
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
    const success = await createItem(input, list)
    if (success) {
      setInput("");
    } else {
      console.log("Something went wrong")
    }
  }

  async function handleDeleteItem(item) {
    const success = await deleteItem(item)
    const name = item.get("name")
    if (success) {
      console.log(name + "was deleted")
    } else {
      console.log("Something went wrong")
    }
  }

    return (
    <div className="list-wrapper">
      <h2>{list.get("name")}</h2> <button className="delete-item-button" onClick={() => deleteList(list)}>🗑️</button>
      <button className="hide-button" onClick={reload}>Reload</button>
        <div className="">
        <form className="input-form" onSubmit={handleSubmit}>
          <input className="input-field" type="text" value={input} onChange={handleChange} />
          <input className="submit-button" type="submit" />
        </form>
        <ul className="list">
          { results ? results.sort((a, b) => a.get("createdAt") > b.get("createdAt"))
          .map((item) => (
            <ListItem key={item.id} item={item} deleteItem={handleDeleteItem} />
          ))
          : <h2>No items in the list.</h2>
          }
        </ul>
        {isLoading && <p>{"Loading…"}</p>}
        {isSyncing && <p>{"Syncing…"}</p>}
        {isLive ? <p>{"Status: Live"}</p> : <p>{"Status: Offline"}</p>}
        {error && <p>{error.message}</p>}
        {count && <p>{`Count: ${count}`}</p>}
      </div>
    </div>
  );
};

export default List;
