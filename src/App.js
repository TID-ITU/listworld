import "./App.css"
import List from "./components/List/List";
import {getCurrentUserLists, createList} from './API/api'
import Parse from 'parse'
import { useEffect, useState } from 'react';
// import ProductList from "./components/ProductList/ProductList";

function App() {
  const [input, setInput] = useState("")
  const [lists, setLists] = useState([])
  const [activeList, setActiveList] = useState("")

  useEffect( () => {
    if (lists.length === 0) {
      const getData = async () => {
        const l = await getCurrentUserLists()
        setLists(l)
        console.log(l)
      }
      getData()
    }
    return () => Parse.User.logOut()
  },[])

  function handleChange(event) {
    setInput(event.target.value)
  }

  async function handleSubmit() {
    const list = await createList(input)
    setLists(prevState => [...prevState, {name: input, id: list.id}])
    setInput("")
  }
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={handleChange} />
      <input type="submit" />
      </form>
      <ul>
        {lists.length>0 && lists.map(({name, id}) => 
          <li key={id}>
            <button onClick={() => setActiveList(id)}>
              {name}
            </button>
          </li>
        )}
      </ul>
      {/* <List  /> */}
      
    </div>
  );
}

export default App;
