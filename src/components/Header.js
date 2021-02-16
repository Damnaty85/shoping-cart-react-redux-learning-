import React from 'react';
import SmallBasket from "./SmallBasket";
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Header() {
    return (
        <header>
            <div className="container _header">
                <h2><Link to="/">Shopping React-Redux</Link></h2>
                <div className="header-inner__wrapper">
                    <SmallBasket/>
                    <PersonIcon/>
                    <FavoriteIcon/>
                </div>
            </div>
        </header>
    );
}

export default Header;
