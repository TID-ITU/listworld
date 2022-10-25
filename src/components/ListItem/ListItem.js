import "./ListItem.css";

function ListItem({ item, index, deleteItem }) {

    function handleClick(index) {
        deleteItem(index)
      }

  return (
    <li>
      {item}
      <span onClick={() => handleClick(index)}>🗑️</span>
    </li>
  );
}

export default ListItem