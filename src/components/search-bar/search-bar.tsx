import React, { useState, useEffect } from "react";

import './search-bar.scss';



interface SearchBarProps{
    initValue?: string,
    placeholder?: string,

    onTextChange?: (newText: string) => void,

    onAddClick?: (text: string) => void,
}

export const SearchBar = ({initValue, placeholder, onTextChange, onAddClick}:SearchBarProps) =>{

    const [text, setText] = useState(initValue ?? '')

    useEffect(() =>{
        if (onTextChange) onTextChange(text)
    }, [text])


    const OnTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = event.currentTarget.value
        setText(newValue);
    }

    const OnAddClick = () =>{
        setText('');

        if (onAddClick && text !== '') onAddClick(text);
    }

    const OnKeyDown = (e: React.KeyboardEvent) =>{
        if (e.key === 'Enter')
            OnAddClick()
    }

    return(
        <div className="search_bar_wrapper">
            <input type="text" placeholder={placeholder} onKeyDown={OnKeyDown} value={text} onInput={OnTextChange}/>
            <button onClick={OnAddClick}>+</button>
        </div>
    )
}