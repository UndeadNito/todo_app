import React, { useState } from "react";

import './search-bar.scss';



interface SearchBarProps{
    initValue?: string,
    placeholder?: string,

    onTextChange?: (newText: string) => void,

    onAddClick?: (text: string) => void,
}

export const SearchBar = ({initValue, placeholder, onTextChange, onAddClick}:SearchBarProps) =>{

    const [text, setText] = useState(initValue ?? '')


    const OnTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = event.currentTarget.value
        setText(newValue);

        if (onTextChange) onTextChange(newValue)
    }

    const OnAddClick = () =>{
        if (onAddClick) onAddClick(text);
    }

    return(
        <div className="search_bar_wrapper">
            <input type="text" placeholder={placeholder} value={text} onInput={OnTextChange}/>
            <button onClick={OnAddClick}>+</button>
        </div>
    )
}