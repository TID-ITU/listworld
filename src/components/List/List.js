import {getList} from '../../API/api'
import { useEffect, useState } from 'react';
import './List.css'
import Item from '../Item/Item';

const List = ({listId}) => {
    const [input, setInput] = useState()
    const [list, setList] = useState()    

    useEffect(() => {
        if (list === 0) { //bad way of doing it with a todo list yo
            getList(listId)
            setList()
        }
    })

    function handleChange(event) {
        setInput(event.target.value)
    }

    function deleteItem(index) {
        
    }

    return (
        <>
        <h1></h1>
        <input type="text" value={input} onChange={handleChange} />
        <ul>
            {list.map((item, index) => <Item deleteItem={() => deleteItem(index)} name={item} /> )}
        </ul>
        </>
    )
}

export default List;