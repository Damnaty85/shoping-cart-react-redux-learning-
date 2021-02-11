import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import BasketItem from "../components/BasketItem";
import { clearBasket, removeBasketItem } from "../redux/actions/basket";

function Basket() {
    const dispatch = useDispatch();
    const { totalPrice, totalCount, items } = useSelector(({ addToCart }) => addToCart);

    const addedProducts = Object.keys(items).map((key) => {
        return items[key].items[0];
    });

    const handleClearBasket = () => {
        dispatch(clearBasket())
    };

    const handleRemoveBasketItem = (id) => {
        dispatch(removeBasketItem(id))
    };

    return (
        <>
            <h1>В корзине {totalCount} товара</h1>
            <button onClick={handleClearBasket}>Очистить корзину</button>
            <div className="basket-items">
                {
                    addedProducts.map((obj) => (
                        <BasketItem
                            key={obj.name}
                            id={obj.id}
                            name={obj.name}
                            image={obj.image}
                            category={obj.category}
                            size={obj.sizes}
                            price={items[obj.id].totalPrice}
                            count={items[obj.id].items.length}
                            handleRemoveBasketItem={handleRemoveBasketItem}
                        />
                    ))
                }
            </div>
            <p className="basket__total-price">Всего товара на сумму: {totalPrice}</p>
        </>
    );
}

export default Basket;
