import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

import { SearchBar } from "./search-bar";

afterEach(cleanup)

describe('Search bar', () =>{
    it('uses placeholder', async () =>{
        act(() =>{
            render(<SearchBar placeholder="somePlaceholder"/>)
        })
    
        const input = await screen.findByPlaceholderText('somePlaceholder')
        expect(input).toBeInTheDocument()
    })
    
    it('initializes with value', async () =>{
        act(() =>{
            render(<SearchBar initValue="Value init"/>)
        })
    
        const input = await screen.findByDisplayValue('Value init')
        expect(input).toBeInTheDocument()
    })

    it('fires text change callback', () =>{
        const handleChange = jest.fn();
        act(() =>{
            render(<SearchBar onTextChange={handleChange}/>)
        })

        const input = document.querySelector('div.search_bar_wrapper input')
        expect(input).toBeInTheDocument()

        act(() =>{
            userEvent.type(input!, 'hello')
        })

        expect(handleChange).toHaveBeenCalledTimes(6); 
        //for tracking text changes been used "useEffect", so it 6 calls instead of 5 (it does initial call)
    })

    it('fires add button click event', async () =>{
        const handleChange = jest.fn();
        act(() =>{
            render(<SearchBar onAddClick={handleChange}/>)
        })

        const input = document.querySelector('div.search_bar_wrapper input')
        const addButton = await screen.findByText('+')
        expect(addButton).toBeInTheDocument()

        act(() =>{
            userEvent.type(input!, 'new todo')
            userEvent.click(addButton)
        })

        expect(handleChange).toHaveBeenCalledTimes(1)
        expect(handleChange.mock.calls[0][0]).toBe('new todo')
    })
})