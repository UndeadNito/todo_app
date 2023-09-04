import React, { useState } from "react";

import './todo-entry.scss';

import { ReactComponent as Delete } from '../../icons/delete.svg';
import { ReactComponent as Done } from '../../icons/done.svg';
import { ReactComponent as NotDone } from '../../icons/not-done.svg';



interface TodoEntryProps{
    todo: Todo

    onChange?: (changedTodo: Todo) => void,

    onDelete?: (deletedTodo: Todo) => void,
}

export const TodoEntry = ({todo, onChange, onDelete} : TodoEntryProps) =>{

    const [title, setTitle] = useState(todo.title);
    const [done, setDone] = useState(todo.done);


    const OnTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = event.currentTarget.value;

        setTitle(newValue)

        if (onChange) onChange({id: todo.id, title: newValue, done: done})
    }

    const OnStateChange = () =>{
        setDone(current => !current)

        if (onChange) onChange({id: todo.id, title: title, done: !done})
    }

    const OnDelete = () =>{
        if (onDelete) onDelete({id: todo.id, title: title, done: done})
    }


    return(
        <div className="todo_entry_wrapper">
            <button onClick={OnStateChange}>{done ? <Done/>: <NotDone/>}</button>
            <input type="text" className={done ? 'done': undefined} value={title} onInput={OnTextChange}/>
            <button className="button_red" onClick={OnDelete}><Delete/></button>
        </div>
    )
}