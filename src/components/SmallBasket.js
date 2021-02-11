import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { removeBasketItem } from "../redux/actions/basket";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';

function SmallBasket() {
    const dispatch = useDispatch();
    const { items, totalPrice, totalCount } = useSelector(({ addToCart }) => addToCart);
    const cartItems = useSelector(({ addToCart }) => addToCart.items);

    const addedProducts = Object.keys(items).map((key) => {
        return items[key].items[0];
    });

    const handleRemoveBasketItem = (id) => {
        dispatch(removeBasketItem(id))
    };

    return (
        <div className="small-basket">
            <Link to="/cart">
                <ShoppingCartOutlinedIcon/>
                {totalCount !== 0 && <span>{totalCount}</span>}
            </Link>
            <span className="small-basket__detail">
                {addedProducts.length === 0 ? <span className="small-basket__empty"><RemoveShoppingCartOutlinedIcon/><span>Корзина пустая</span></span> :
                    addedProducts.map((obj) => (
                        <span key={obj.name} className="small-basket__item">
                            <span className="small-basket__left">
                                <img src={obj.image} alt={obj.name}/>
                            </span>
                            <span className="small-basket__right">
                                <span>{obj.name}</span>
                                <span className="small-basket__price">{obj.price} руб.</span>
                                <div className="small-basket__quantity">
                                    <button>-</button>
                                    <span>{cartItems[obj.id] && cartItems[obj.id].items.length}</span>
                                    <button>+</button>
                                </div>
                                <button onClick={() => handleRemoveBasketItem(obj.id)}>Удалить из корзины</button>
                            </span>
                        </span>
                    ))
                }
                {
                    totalPrice === 0 ? `` : <span className="small-basket__total">Товара на сумму: {totalPrice} руб.</span>
                }
            </span>
        </div>
    );
}

export default SmallBasket;
