import React, { useState, useEffect } from "react";

import { ReactComponent as Done} from '../../icons/done.svg';
import { ReactComponent as NotDone} from '../../icons/not-done.svg';

import './search-bar.scss';



interface SearchBarProps{
    initValue?: string,
    placeholder?: string,

    onTextChange?: (newText: string) => void,

    onAddClick?: (text: string) => void,

    onDoneFilterChange?: (done: boolean, notDone: boolean) => void
}

export const SearchBar = ({initValue, placeholder, onTextChange, onAddClick, onDoneFilterChange}:SearchBarProps) =>{

    const [text, setText] = useState(initValue ?? '')
    const [doneFilter, setDoneFilter] = useState([true, true]);

    useEffect(() =>{
        if (onTextChange) onTextChange(text)
    }, [text])

    useEffect(() =>{
        if (onDoneFilterChange) onDoneFilterChange(doneFilter[0], doneFilter[1])
    }, [doneFilter])


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

    const ChangeDoneFilter = (button: boolean) =>{
        setDoneFilter(current => {
            if (button && current[0] && !current[1]){
                return [false, true]
            }

            if (!button && !doneFilter[0] && doneFilter[1]){
                return [true, false]
            }

            if (button) return [!current[0], current[1]]

            return [current[0], !current[1]]
        })
    }

    return(
        <div className="search_bar_wrapper">
            <input type="text" placeholder={placeholder} onKeyDown={OnKeyDown} value={text} onInput={OnTextChange}/>
            <button className={`search_bar_done_filter ${doneFilter[0] ? 'active' : ''}`}
                    onClick={() => ChangeDoneFilter(true)}>
                <Done/>
            </button>
            <button className={`search_bar_done_filter ${doneFilter[1] ? 'active' : ''}`}
                    onClick={() => ChangeDoneFilter(false)}>
                <NotDone/>
            </button>
            <button onClick={OnAddClick}>+</button>
        </div>
    )
}