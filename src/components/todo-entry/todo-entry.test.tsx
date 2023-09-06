import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

import { TodoEntry } from "./todo-entry";

afterEach(cleanup)

describe('Single todo element', () =>{

    it('renders todo data', () =>{
        act(() =>{
            render(<TodoEntry todo={{id:'0', title:'text', done: false}}/>)
        })
    
        expect(screen.getByDisplayValue('text')).not.toHaveClass('done');
    })
    
    it('marks todo done', () =>{
        act(() =>{
            render(<TodoEntry todo={{id:'0', title:'text', done: false}}/>)
        })
    
        const button = document.querySelector('div.todo_entry_wrapper button')
        const input = screen.getByDisplayValue('text')
        expect(button).toBeInTheDocument()
    
        fireEvent.click(button!);
    
        expect(input).toHaveStyle('color: var(--color-font-inactive, #6e7681)')
    })
    
    it('sends delete callback', () =>{
        const handleClick = jest.fn();
        act(() =>{
            render(<TodoEntry todo={{id:'0', title:'text', done: false}} onDelete={handleClick}/>)
        })
    
        const deleteButton = document.querySelector('div.todo_entry_wrapper button:last-child')
        expect(deleteButton).toBeInTheDocument()
    
        fireEvent.click(deleteButton!, { bubbles: true })
    
        expect(handleClick).toHaveBeenCalledTimes(1);
    })
    
    it('sends change callback', () =>{
        const handleChange = jest.fn();
        act(() =>{
            render(<TodoEntry todo={{id:'0', title:'text', done: false}} onChange={handleChange}/>)
        })
    
        const input = screen.getByDisplayValue('text')
        expect(input).toBeInTheDocument()
    
        act(() =>{
            userEvent.type(input, '123')
        })
    
        expect(handleChange).toHaveBeenCalledTimes(3);
    })
})