import './ListManagement.css'
import useLiveLists from "../../hooks/useLiveLists"

export default function ListManagement({setActiveList}) {

    const { input, handle, status, lists, count, error, reload } = useLiveLists()

    return <div>
        <h2>Create new list</h2>
        <form onSubmit={handle.submit}>
        <input type="text" value={input} onChange={handle.change} />
        <input type="submit" />
        </form>
        <h3>Your lists:</h3>
        <ul className="list-nav">
            { lists ? lists.sort((a, b) => a.get("createdAt") > b.get("createdAt"))
          .map( list => 
            <li className="list-nav-item" key={list.id}>
                <button className="list-nav-button" onClick={() => setActiveList(list)}>
                    {list.get("name")}
                </button>
            </li>
            ) : <h2>No lists at this time.</h2>}
        </ul>
    </div>
}