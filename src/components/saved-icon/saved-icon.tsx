import React from "react";

import useTodosSaveObserver from "../../hooks/todo/useTodosSaveObserver";

import { ReactComponent as Saved} from '../../icons/saved.svg';

import './saved-icon.scss';

export const SavedIcon = () =>{
    const [saved, forceSave] = useTodosSaveObserver();

    return(
        <div className={`saved_icon_wrapper ${saved ? 'saved' : 'unsaved'}`} 
            title={saved ? 'Saved' : 'Not saved yet'}
            onClick={forceSave}>
            <Saved/>
        </div>
    )
}