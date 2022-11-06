import { useState } from "react";
import { removeItemFromList } from "../../API/api";
import ListItem from "../ListItem/ListItem";
import Parse from "parse";
import {useParseQuery} from '@parse/react'
import "./List.css";

const List = ({list, handleDelete}) => {
  const [input, setInput] = useState("");


//   const parseQuery = new Parse.Query("Item")
//   parseQuery.equalTo("lists", list)
//   parseQuery.ascending("createdAt");
//   parseQuery.includeAll();


    const parseQuery = new Parse.Query("Message");
    // Get messages that involve both nicknames
    parseQuery.containedIn("sender", [
    "3pLwBwMDCm"
    ]);
    parseQuery.containedIn("receiver", [
    "sRc7p2HUwS"
    ]);
    // Set results ordering
    parseQuery.ascending("createdAt");

    // Include nickname fields, to enable name getting on list
    parseQuery.includeAll();


  const { isLive, isLoading, isSyncing, results, count, error, reload } =
    useParseQuery(parseQuery, {
      enableLocalDatastore: true, // Enables cache in local datastore (default: true)
      enableLiveQuery: true, // Enables live query for real-time update (default: true)
    });

  function handleChange(event) {
    setInput(event.target.value);
  }

  console.log(results)

  async function createItem(event) {
    console.log("Creating item: ",input, "on list: ",list)
    event.preventDefault();
    try {
        const Item = Parse.Object.extend("Item")
        const item = new Item()
        item.set("name", input)
        let listsRelation = item.relation("lists")
        listsRelation.add(list)
        item.save()
        setInput("")
    } catch (error) {
        console.error(error)
    }
}

const sendMessage = async (event) => {
    event.preventDefault()
    try {


      // Get sender and receiver nickname Parse objects
      const senderNicknameObjectQuery = new Parse.Query("Nickname");
      senderNicknameObjectQuery.equalTo("objectId", "3pLwBwMDCm");
      let senderNicknameObject = await senderNicknameObjectQuery.first();
      const receiverNicknameObjectQuery = new Parse.Query("Nickname");
      receiverNicknameObjectQuery.equalTo("objectId", "sRc7p2HUwS");
      let receiverNicknameObject = await receiverNicknameObjectQuery.first();

      // Create new Message object and save it
      let Message = new Parse.Object("Message");
      Message.set("text", input);
      Message.set("sender", senderNicknameObject);
      Message.set("receiver", receiverNicknameObject);
      Message.save();

      // Clear input
      setInput("");
    } catch (error) {
      alert(error);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const addedItem = await createItem(input, list)
    if (addedItem) {
    //   setResults(prevState => [...prevState, addedItem])
      setInput("");
    } else {
      console.log("Something went wrong")
    }
  }

  async function deleteItem(item) {
    const removedItem = await removeItemFromList(item, list)
    if (removedItem) {
    //   setResults(prevState => prevState.filter(({id}) => id !== removedItem.id ))
    } else {
      console.log("Something went wrong")
    }
  }

    return (
    <div className="list-wrapper">
      <h2>{list.get("name")}</h2> <button className="delete-item-button" onClick={() => handleDelete(list)}>🗑️</button>
      <button className="hide-button" onClick={reload}>Reload</button>
        <div className="">
        <form className="input-form" onSubmit={sendMessage}>
          <input className="input-field" type="text" value={input} onChange={handleChange} />
          <input className="submit-button" type="submit" />
        </form>
        <ul className="list">
          { results ? results.sort((a, b) => a.get("createdAt") > b.get("createdAt"))
          .map((item) => (
            // <ListItem key={item.id} item={item} deleteItem={deleteItem} />
            <li key={item.id}>{item.get("text")}</li>
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
