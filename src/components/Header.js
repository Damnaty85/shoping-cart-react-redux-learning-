import React from 'react';
import SmallBasket from "./SmallBasket";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <h2><Link to="/">SR&R</Link></h2>
            <SmallBasket/>
        </header>
    );
}

export default Header;
