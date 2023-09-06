import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

import { Main } from "./main";

afterEach(() => {
    cleanup()
    jest.clearAllMocks()
})

beforeEach(() =>{
    global.Storage.prototype.getItem = jest.fn((key: any) => { return JSON.stringify([{id: '0', title: 'saved todo', done: 'false'}])})
    global.Storage.prototype.setItem = jest.fn(() => {})
})

describe('Main component', () =>{
    it('adds todo', async () =>{
        act(() =>{
            render(<Main/>)
        })

        const input = await screen.findByPlaceholderText('Enter task name')
        const addButton = await screen.findByText('+')
        expect(input).toBeInTheDocument()
        expect(addButton).toBeInTheDocument()

        act(() =>{
            userEvent.type(input, 'new todo')
            userEvent.click(addButton)
        })

        expect(await screen.findByDisplayValue('new todo')).toBeInTheDocument()
    })

    it('deletes todo', async () =>{
        act(() =>{
            render(<Main/>)
        })

        const deleteButton = document.querySelector('div.todo_entry_wrapper button:last-child')
        expect(deleteButton).toBeInTheDocument()

        expect(await screen.queryByDisplayValue('saved todo')).toBeInTheDocument()

        act(() =>{
            userEvent.click(deleteButton!)
        })

        expect(await screen.queryByDisplayValue('saved todo')).not.toBeInTheDocument()
    })
})