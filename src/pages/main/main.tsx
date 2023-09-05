import React, { useState } from "react";

import TodoEntry from "../../components/todo-entry";
import SearchBar from "../../components/search-bar";
import useTodos from "../../hooks/todo/useTodos";
import SavedIcon from "../../components/saved-icon";

import './main.scss';



export const Main = () =>{

    const [activeTitle, setActiveTitle] = useState('')

    const [
        todos,
        addTodo,
        changeTodo,
        deleteTodo
    ] = useTodos()

    return(
        <div className="main_wrapper">
            <div className="main_content_wrapper">
                <SearchBar placeholder="Enter task name" 
                    onTextChange={text => setActiveTitle(text)} 
                    onAddClick={title => addTodo(title)}/>
                <div className="main_todos_wrapper">
                    {
                        todos
                        .filter(todo => todo.title.toLowerCase().includes(activeTitle.toLowerCase()))
                        .map((todo) =>{
                            return <TodoEntry key={todo.id} todo={todo} 
                                onChange={changed => changeTodo(changed)}
                                onDelete={deleted => deleteTodo(deleted)}/>
                        })
                    }
                </div>
            </div>
            <div className="main_saved_icon_positioner">
                <SavedIcon/>
            </div>
        </div>
    )
}