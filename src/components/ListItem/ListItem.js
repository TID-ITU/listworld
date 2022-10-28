import "./ListItem.css";

function ListItem({ item, index, deleteItem }) {

    function handleClick(index) {
        deleteItem(index)
      }

  return (
    <li className="list-item">
      <p className="item-name">{item}</p>
      <button className="delete-item-button" onClick={() => handleClick(index)}>🗑️</button>
    </li>
  );
}

export default ListItem