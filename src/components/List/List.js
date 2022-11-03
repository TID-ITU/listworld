import { useEffect, useState } from 'react';
import './ProductList.css'

const List = () => {
    const [input, setInput] = useState([])

    // useEffect(() => {
    //     if (list.length === 0) {

    //     }
    // },)

    function handleChange(event) {
        setInput(event.target.value)
    }

    return (
        <>
        <input type="text" value={input} onChange={handleChange} />
        <ul>
            
        </ul>
        </>
    )
}

export default List;