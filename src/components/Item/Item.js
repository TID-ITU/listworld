import { useState } from "react"

export default function Item({deleteItem, value}) {
    const [input, setInput] = useState(value)
    
    function handleChange(event) {
        setInput(event.target.value)
    }
    return (
        <li>
            <input type={text} value={input} onChange={handleChange} /><span onClick={deleteItem}> D</span>
        </li>
    )
}