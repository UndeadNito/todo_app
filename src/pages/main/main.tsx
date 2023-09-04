import React from "react";

import TodoEntry from "../../components/todo-entry";
import SearchBar from "../../components/search-bar";

import './main.scss';

const testTodos: Todo[] =[
    {
        id: '1',
        title: 'do smf',
        done: false,
    },
    {
        id: '2',
        title: '12345',
        done: true,
    },
    {
        id: '3',
        title: 'look',
        done: false,
    },
]

export const Main = () =>{

    return(
        <div className="main_wrapper">
            <div className="main_content_wrapper">
                <SearchBar placeholder="Enter task name"/>
                <div className="main_todos_wrapper">
                    {
                        testTodos.map((todo) =>{
                            return <TodoEntry key={todo.id} todo={todo}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}