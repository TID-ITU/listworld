import "./ListItem.css";

function ListItem({ name, id, deleteItem }) {

    function handleClick() {
        deleteItem(id)
      }

  return (
    <li className="list-item">
      <p className="item-name">{name}</p>
      <button className="delete-item-button" onClick={handleClick}>🗑️</button>
    </li>
  );
}

export default ListItem