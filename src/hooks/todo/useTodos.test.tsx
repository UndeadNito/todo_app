import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

import useTodosSaveObserver from "./useTodosSaveObserver";
import initTodos from "./initTodo";
import useTodos from "./useTodos";

afterEach(() => {
    cleanup()
    jest.clearAllMocks()
})

const ObserverTestComponent = () =>{
    const [saved, forceSave] = useTodosSaveObserver();

    return (
        <button id="observer-test-button" onClick={forceSave}>{saved ? 'saved' : 'unsaved'}</button>
    )
}

const TodosTestComponent = () =>{
    const [
        todos,
        addTodo,
        changeTodo,
        deleteTodo
    ] = useTodos()

    return(
        <div id='todos-test'>
            <button onClick={() => addTodo('added todo')}>add</button>
            <button onClick={() => changeTodo({id: '0', title: 'changed todo', done: true})}>change</button>
            <button onClick={() => deleteTodo({id: '0', title: '', done: true})}>delete</button>
            {
                todos.map((todo) =>{
                    return <span key={todo.id}>{todo.title}</span>
                })
            }
        </div>
    )
}

describe('Todos save observer', () =>{
    it('listens to "todos-changed"', async () =>{
        act(() =>{
            render(<ObserverTestComponent/>)
        })

        const button = document.querySelector('#observer-test-button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent('saved')

        act(() =>{
            window.dispatchEvent(new Event('todos-changed'))
        })
        expect(button).toHaveTextContent('unsaved')
    })

    it('listens for "todos-saved"', () =>{
        act(() =>{
            render(<ObserverTestComponent/>)
        })

        const button = document.querySelector('#observer-test-button')
        act(() =>{
            window.dispatchEvent(new Event('todos-changed'))
        })
        expect(button).toHaveTextContent('unsaved')
        
        act(() =>{
            window.dispatchEvent(new Event('todos-saved'))
        })
        expect(button).toHaveTextContent('saved')
    })

    it('sends force save event', () =>{
        const EventListener = jest.fn();

        window.addEventListener('todos-save-force', EventListener)

        act(() =>{
            render(<ObserverTestComponent/>)
        })

        const button = document.querySelector('#observer-test-button')

        userEvent.click(button!)

        expect(EventListener).toHaveBeenCalledTimes(1)
    })
})

describe('Todos initializer', () =>{
    it('initializes with default values', () =>{
        global.Storage.prototype.getItem = jest.fn((key: any) => null)
        global.Storage.prototype.setItem = jest.fn(() => {})

        const todos = initTodos()

        expect(todos[0].title).toBe('<- mark todo as done')

        //@ts-ignore
        global.Storage.prototype.getItem.mockReset()
        //@ts-ignore
        global.Storage.prototype.setItem.mockReset()
    })

    it('initializes with saved data', () =>{
        global.Storage.prototype.getItem = jest.fn((key: any) => { return JSON.stringify([{id: '0', title: 'saved todo', done: 'false'}])})

        const todos = initTodos()

        expect(todos[0].title).toBe('saved todo')

        //@ts-ignore
        global.Storage.prototype.getItem.mockReset()
    })

    it('shows error todos when data is broken', () =>{
        global.Storage.prototype.getItem = jest.fn((key: any) => { return ('[{},]')})

        const todos = initTodos()

        expect(todos[0].title).toBe('Your todos got corrupted for some reason')

        //@ts-ignore
        global.Storage.prototype.getItem.mockReset()
    })
})

describe('Main todos hook', () =>{
    it('initializes with local storage data', async () =>{
        global.Storage.prototype.getItem = jest.fn((key: any) => { return JSON.stringify([{id: '0', title: 'saved todo', done: 'false'}])})
        global.Storage.prototype.setItem = jest.fn(() => {})

        act(() =>{
            render(<TodosTestComponent/>)
        })

        expect(await screen.findByText('saved todo')).toBeInTheDocument()
    })

    it('listens to add button', async () =>{
        global.Storage.prototype.getItem = jest.fn((key: any) => { return JSON.stringify([{id: '0', title: 'saved todo', done: 'false'}])})
        global.Storage.prototype.setItem = jest.fn(() => {})
        const addListener = jest.fn();
        window.addEventListener('todos-changed', addListener)

        act(() =>{
            render(<TodosTestComponent/>)
        })

        const button = await screen.findByText('add')
        expect(button).toBeInTheDocument()

        act(() =>{
            userEvent.click(button!)
        })

        expect(addListener).toHaveBeenCalledTimes(1)
        expect(await screen.findByText('added todo')).toBeInTheDocument()
    })

    it('listens to change button', async () =>{
        global.Storage.prototype.getItem = jest.fn((key: any) => { return JSON.stringify([{id: '0', title: 'saved todo', done: 'false'}])})
        global.Storage.prototype.setItem = jest.fn(() => {})
        const changeListener = jest.fn();
        window.addEventListener('todos-changed', changeListener)

        act(() =>{
            render(<TodosTestComponent/>)
        })

        const button = await screen.findByText('change')
        expect(button).toBeInTheDocument()

        act(() =>{
            userEvent.click(button!)
        })

        expect(changeListener).toHaveBeenCalledTimes(1)
        expect(await screen.findByText('changed todo')).toBeInTheDocument()
    })

    it('listens to delete button', async () =>{
        global.Storage.prototype.getItem = jest.fn((key: any) => { return JSON.stringify([{id: '0', title: 'saved todo', done: 'false'}])})
        global.Storage.prototype.setItem = jest.fn(() => {})
        const deleteListener = jest.fn();
        window.addEventListener('todos-changed', deleteListener)

        act(() =>{
            render(<TodosTestComponent/>)
        })

        const button = await screen.findByText('delete')
        expect(button).toBeInTheDocument()

        act(() =>{
            userEvent.click(button!)
        })

        expect(deleteListener).toHaveBeenCalledTimes(1)
        expect(screen.queryByText('saved todo')).not.toBeInTheDocument()
    })

    it('saves data after 60 seconds', async () =>{
        jest.useFakeTimers()

        global.Storage.prototype.getItem = jest.fn((key: any) => { return JSON.stringify([{id: '0', title: 'saved todo', done: 'false'}])})
        global.Storage.prototype.setItem = jest.fn(() => {})
        const addListener = jest.fn();
        const savedListener = jest.fn()
        window.addEventListener('todos-changed', addListener)
        window.addEventListener('todos-saved', savedListener)

        act(() =>{
            render(<TodosTestComponent/>)
        })

        const button = await screen.findByText('add')

        act(() =>{
            userEvent.click(button!)
        })

        expect(addListener).toHaveBeenCalled()
        expect(savedListener).not.toHaveBeenCalled()

        act(() =>{
            jest.advanceTimersByTime(61000)
        })

        expect(savedListener).toHaveBeenCalled()
        expect(global.Storage.prototype.setItem).toHaveBeenCalled()
    })
})