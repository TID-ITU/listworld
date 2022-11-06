import { useEffect, useState } from "react";
import { createItem, getListItems, removeItemFromList } from "../../API/api";
import ListItem from "../ListItem/ListItem";
import Parse from "parse";
import "./List.css";

const List = ({list, handleDelete, client}) => {
  const [hidden, setHidden] = useState(false)
  const [input, setInput] = useState("");
  const [results, setResults] = useState([])
  const parseQuery = new Parse.Query("Item")
  parseQuery.equalTo("lists", list)
  parseQuery.ascending("createdAt");
  parseQuery.includeAll();

 
  useEffect(() => {
    async function getData() {
      setResults(await getListItems(list))
    }
    getData()
  }, [list])

  let subscription = client.subscribe(parseQuery);
  subscription.on('create', item => {
    setResults(prevState => [...prevState, item])
    console.log(item)
    console.log('On create event');
  });
  subscription.on('delete', item => {
    setResults(prevState => prevState.filter(({id}) => id !== item.id ))
  });

  // const { isLive, isLoading, isSyncing, results, count, error, reload } =
  //   useParseQuery(parseQuery, {
  //     enableLocalDatastore: true, // Enables cache in local datastore (default: true)
  //     enableLiveQuery: true, // Enables live query for real-time update (default: true)
  //   });

  function handleChange(event) {
    setInput(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const addedItem = await createItem(input, list)
    if (addedItem) {
      setResults(prevState => [...prevState, addedItem])
      setInput("");
    } else {
      console.log("Something went wrong")
    }
  }

  async function deleteItem(item) {
    const removedItem = await removeItemFromList(item, list)
    if (removedItem) {
      setResults(prevState => prevState.filter(({id}) => id !== removedItem.id ))
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
            <ListItem key={item.id} item={item} deleteItem={deleteItem} />
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
