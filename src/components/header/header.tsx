import React from "react";

import {ReactComponent as Logo} from '../../icons/logo.svg';

import './header.scss';


export const Header = () =>{
    return(
        <div className="header_wrapper">
            <div className="header_logo">
                <Logo/>
                Todo list
            </div>
        </div>
    )
}