import Parse from "parse";
import { useParseQuery } from "@parse/react";
import { useState } from "react";
import { createItem } from "../API/api";

export default function useList (listObject) {
    const [input, setInput] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const success = await createItem(input, listObject)
        if (success) {
          setInput("");
        } else {
          console.log("Something went wrong")
        }
      }

      function handleChange(event) {
        setInput(event.target.value);
      }

    const parseQuery = new Parse.Query("Item")
    parseQuery.equalTo("list", listObject)
    parseQuery.ascending("createdAt");
    parseQuery.includeAll();
  
    const { isLive, isLoading, isSyncing, results, count, error, reload } =
      useParseQuery(parseQuery, {
        enableLocalDatastore: true, // Enables cache in local datastore (default: true)
        enableLiveQuery: true, // Enables live query for real-time update (default: true)
      });

      const list = results

    return { 
        list, 
        input, 
        handle: { submit: handleSubmit, change: handleChange },
        status: { isLive, isLoading, isSyncing}, 
        count, 
        error, 
        reload 
    }
}