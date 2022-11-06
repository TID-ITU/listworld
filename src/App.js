import "./App.css"
import List from "./components/List/List";
import {getCurrentUserLists, signIn, createList, deleteList, signOut} from './API/api'
import { useEffect, useState } from 'react';
import Parse from "parse";
// import ProductList from "./components/ProductList/ProductList";

const appkey = "yQQzmBNtqIXWZ3hXkpzDbT5TEX8CxQ6MTBps5XAV"
const jskey = "35JNgEsLV9wyypSnL8Qfg2sUCo4b0DLIy2ugTiUJ"
const subdomain = 'kiasnewapp.b4a.io'
const serverURL = 'https://parseapi.back4app.com/'
Parse.initialize("yQQzmBNtqIXWZ3hXkpzDbT5TEX8CxQ6MTBps5XAV", "35JNgEsLV9wyypSnL8Qfg2sUCo4b0DLIy2ugTiUJ")
Parse.serverURL = serverURL
Parse.enableLocalDatastore()
let client = new Parse.LiveQueryClient({
  applicationId: appkey,
    serverURL: 'wss://' + subdomain, // Example: 'wss://livequerytutorial.back4app.io'
    javascriptKey: jskey
})
client.open()
// import { initializeParse } from  '@parse/react';
// initializeParse(
//   "kiasnewapp.b4a.io", 
//   "yQQzmBNtqIXWZ3hXkpzDbT5TEX8CxQ6MTBps5XAV", 
//   "35JNgEsLV9wyypSnL8Qfg2sUCo4b0DLIy2ugTiUJ"
// );

function App() {
  const [input, setInput] = useState("")
  const [lists, setLists] = useState([])
  const [activeList, setActiveList] = useState()

  // useEffect( () => {
  //   if (lists.length === 0) {
  //     const getData = async () => {
        
  //       console.log(l)
  //     }
  //     getData()
  //   }
  //   // return () => Parse.User.logOut()
  // },[])


  async function handleSignIn() {
    await signIn("bjwe", "password")
    const l = await getCurrentUserLists()
    console.log(l)
    setLists(l)
  }

  async function handleSignOut() {
    await signOut()
    setLists([])
  }

  function handleChange(event) {
    setInput(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const list = await createList(input)
    setLists(prevState => [...prevState, {name: input, id: list.id}])
    setInput("")
  }

  async function handleDelete(listId) {
    const success = await deleteList(listId)
    if(success) {
      console.log("List deleted")
      setActiveList("")
      setLists(prevState => [...prevState.filter( ({id}) => id !== listId )])
    }
  }
  
  return (
    <div className="App">
      <div className="list-admin">
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignOut}>Sign Out</button>
        <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <input type="submit" />
        </form>
        <h3>Your lists:</h3>
        <ul className="list-nav">
          {lists.length>0 && lists.map( list => 
            <li className="list-nav-item" key={list.id}>
              <button className="list-nav-button" onClick={() => setActiveList(list)}>
                {list.get("name")}
              </button>
            </li>
          )}
        </ul>
      </div>
      <div className="list-content">
        {activeList && <List list={activeList} handleDelete={handleDelete} client={client} />}
      </div>
    </div>
  );
}

export default App;
