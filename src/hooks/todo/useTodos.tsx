import React, { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid";

import initTodos from "./initTodo";


type TodoAction = Todo & {
    action: 'change' | 'add' | 'delete',
}

const useTodos = (): [Todo[], (title: string) => void, (changedTodo: Todo) => void, (todoToDelete: Todo) => void] =>{
    const [todos, setTodos] = useState<Todo[]>(initTodos())
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        let id = setInterval(SaveTodos, 60000);

        return () => clearInterval(id);
    }, [changed, todos]);

    useEffect(() =>{
        window.addEventListener('todos-save-force', SaveTodos);

        return () => window.removeEventListener('todos-save-force', SaveTodos);
    }, [todos, changed])
        
    useEffect(() =>{
        if (changed)
            window.dispatchEvent(new Event('todos-changed'))
    }, [changed])


    const SaveTodos = () =>{
        if (changed){
            localStorage.setItem('todos', JSON.stringify(todos))
            window.dispatchEvent(new Event('todos-saved'))
            setChanged(false)
        }
        console.log('did smf', changed)
    }


    const AssigneeTodoToChange = (changedTodo: TodoAction) =>{
        const indexInTodos = todos.findIndex(todo => todo.id === changedTodo.id)

        if (indexInTodos < 0 && changedTodo.action === 'delete') throw Error('Todo assigned to deletion doesn`t exist');
        if (indexInTodos < 0 && changedTodo.action === 'change') throw Error('Todo assigned to reduction doesn`t exist');
        if (indexInTodos > -1 && changedTodo.action === 'add') throw Error('Todo assigned to creation already exist');

        setTodos((current) =>{
            switch (changedTodo.action){
                case 'add': {
                    return [changedTodo, ...current];
                }

                case 'change': {
                    return [...current.slice(0, indexInTodos), changedTodo, ...current.slice(indexInTodos + 1)];
                }

                case 'delete': {
                    return [...current.slice(0, indexInTodos), ...current.slice(indexInTodos + 1)];
                }
            }
        })

        setChanged(true);

        console.log('changed')
    }

    

    const AddTodo = (title: string) =>{
        const newTodo: TodoAction = {
            id: uuidv4(),
            title: title,
            done: false,
            action: 'add'
        }

        AssigneeTodoToChange(newTodo);
    }

    const ChangeTodo = (changedTodo: Todo) => {
        const todoAction: TodoAction = {
            id: changedTodo.id,
            title: changedTodo.title,
            done: changedTodo.done,
            action: 'change'
        }

        AssigneeTodoToChange(todoAction);
    }

    const DeleteTodo = (todoToDelete: Todo) => {
        const todoAction: TodoAction = {
            id: todoToDelete.id,
            title: todoToDelete.title,
            done: todoToDelete.done,
            action: 'delete'
        }

        AssigneeTodoToChange(todoAction);
    }


    return [
        todos,
        AddTodo,
        ChangeTodo,
        DeleteTodo,
    ]
}

export default useTodos;
