import { deleteItem } from "../../API/api";
import ListItem from "../ListItem/ListItem";
import useList from "../../hooks/useList";
import "./List.css";

const List = ({listObject, deleteList}) => {

  const { input, handle, status, list, count, error, reload } = useList(listObject)

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
      <h2>{listObject.get("name")}</h2> <button className="delete-item-button" onClick={() => deleteList(listObject)}>🗑️</button>
      <button className="hide-button" onClick={reload}>Reload</button>
        <div className="">
        <form className="input-form" onSubmit={handle.submit}>
          <input className="input-field" type="text" value={input} onChange={handle.change} />
          <input className="submit-button" type="submit" />
        </form>
        <ul className="list">
          { list ? list.sort((a, b) => a.get("createdAt") > b.get("createdAt"))
          .map((item) => (
            <ListItem key={item.id} item={item} deleteItem={handleDeleteItem} />
          ))
          : <h2>No items in the list.</h2>
          }
        </ul>
        {status.isLoading && <p>{"Loading…"}</p>}
        {status.isSyncing && <p>{"Syncing…"}</p>}
        {status.isLive ? <p>{"Status: Live"}</p> : <p>{"Status: Offline"}</p>}
        {error && <p>{error.message}</p>}
        {count && <p>{`Count: ${count}`}</p>}
      </div>
    </div>
  );
};

export default List;
