import Parse from "parse";
import { useParseQuery } from "@parse/react";
import { useState } from "react";
import { createList, getCurrentUser } from "../API/api";

export default function useLiveLists () {
  const [input, setInput] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const success = await createList(input)
    if (success) {
      setInput("");
    } else {
      console.log("Something went wrong")
    }
  }

  function handleChange(event) {
    setInput(event.target.value);
  }

  const parseQuery = new Parse.Query("List")
  parseQuery.include("users", getCurrentUser())
  parseQuery.ascending("createdAt");
  parseQuery.includeAll();

  const { isLive, isLoading, isSyncing, results, count, error, reload } =
    useParseQuery(parseQuery, {
      enableLocalDatastore: true, // Enables cache in local datastore (default: true)
      enableLiveQuery: true, // Enables live query for real-time update (default: true)
    });

  const lists = results

  return { 
      lists, 
      input, 
      handle: { submit: handleSubmit, change: handleChange },
      status: { isLive, isLoading, isSyncing}, 
      count, 
      error, 
      reload 
  }
}