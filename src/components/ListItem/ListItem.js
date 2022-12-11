import "./ListItem.css";

function ListItem({ item, deleteItem }) {

    function handleClick() {
        deleteItem(item)
      }

  return (
    <li className="list-item">
      <p className="item-name">{item.get("name")}</p>
      <button className="delete-item-button" onClick={handleClick}>🗑️</button>
    </li>
  );
}

export default ListItem