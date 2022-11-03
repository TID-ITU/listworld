import { useState } from "react"

export default function Item(props) {
    const [value, setValue] = useState(props.value)
    
    function handleChange(event) {
        setValue(event.target.value)
    }
    return (
        <li>
            <input type={text} value={value} onChange={handleChange} />
        </li>
    )
}