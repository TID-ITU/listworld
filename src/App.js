import {getCurrentUserLists, createList} from './API/api'
import Parse from 'parse'
import { useEffect, useState } from 'react';
// import ProductList from "./components/ProductList/ProductList";

function App() {
  const [input, setInput] = useState("")
  const [lists, setLists] = useState([])

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
        
      {lists.length>0 && lists.map(({name, id}) => <li key={id}><a href={id}>{name}</a></li>)}
      </ul>
      {/* <button onClick={() => console.log(Parse.User.current())}>Test</button> */}
      
    </div>
  );
}

export default App;
