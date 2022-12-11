import "./App.css"
import List from "./components/List/List";
import {getCurrentUserLists, signIn, createList, deleteList, signOut, getCurrentUser} from './API/api'
import { useEffect, useState } from 'react';
import { initializeParse } from  '@parse/react';
import ListManagement from "./components/ListNavigation/ListManagement";

const PARSE_APPLICATION_ID = "yQQzmBNtqIXWZ3hXkpzDbT5TEX8CxQ6MTBps5XAV"
const PARSE_JAVASCRIPT_KEY = "35JNgEsLV9wyypSnL8Qfg2sUCo4b0DLIy2ugTiUJ"
const PARSE_LIVE_QUERY_URL = 'https://kiasnewapp.b4a.io'

initializeParse(
  PARSE_LIVE_QUERY_URL, 
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY
);

function App() {
  const [input, setInput] = useState("")
  const [lists, setLists] = useState([])
  const [liveLists, setLiveLists] = useState(false)
  const [activeList, setActiveList] = useState()

  async function handleSignIn() {
    await signIn("bjwe", "password")
    setLists(await getCurrentUserLists())
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

  async function handleDeleteList(listId) {
    const success = await deleteList(listId)
    if(success) {
      console.log("List deleted")
      setActiveList("")
      setLists(prevState => [...prevState.filter( ({id}) => id !== listId )])
    }
  }

  function handleLiveListTogge() {
    setLiveLists(prevState => !prevState)
  }

  useEffect(() => {
    async function syncLists() {
      if (!liveLists && getCurrentUser) {
        setLists(await getCurrentUserLists())
      }
    }
    syncLists()
  }, [liveLists])
  
  return (
    <div className="App">
      <div className="list-admin">
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignOut}>Sign Out</button>
        <ListManagement setActiveList={setActiveList} />
      </div>
      <div className="list-content">
        {activeList && <List listObject={activeList} deleteList={handleDeleteList} />}
      </div>
    </div>
  );
}

export default App;
