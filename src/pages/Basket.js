import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import BasketItem from "../components/BasketItem";
import { clearBasket, removeBasketItem, plusBasketItem, minusBasketItem } from "../redux/actions/basket";
import Button from "../components/Button";

function Basket() {
    const dispatch = useDispatch();
    const { totalPrice, totalCount, items } = useSelector(({ addToCart }) => addToCart);

    const addedProducts = Object.keys(items).map((key) => {
        return items[key].items[0];
    });

    const handleClearBasket = () => {
        dispatch(clearBasket())
    };

    const removeBasketItemHandler = (id) => {
        dispatch(removeBasketItem(id))
    };

    const plusesItemHandler = (id) => {
        dispatch(plusBasketItem(id));
    };

    const minusesItemHandler = (id) => {
        dispatch(minusBasketItem(id));
    };

    return (
        <div className="basket">
            <h1>
                {
                    addedProducts.length !== 0
                    ? `В корзине ${totalCount} товара`
                        : `В корзине пусто`
                }
            </h1>
            {addedProducts.length !== 0 && <Button onClick={handleClearBasket}>Очистить корзину</Button>}
            <div className="basket__wrapper">
                {
                    addedProducts.map((obj) => (
                        <BasketItem
                            key={obj.name}
                            id={obj.id}
                            name={obj.name}
                            image={obj.image}
                            category={obj.category}
                            size={obj.sizes}
                            currency={obj.currency}
                            price={items[obj.id].totalPrice}
                            count={items[obj.id].items.length}
                            removeBasketItemHandler={removeBasketItemHandler}
                            plusesItemHandler={plusesItemHandler}
                            minusesItemHandler={minusesItemHandler}
                        />
                    ))
                }
            </div>
            {addedProducts.length !== 0 && <p className="basket__total-price">Всего товара на сумму: {totalPrice} RUB</p>}
            {addedProducts.length !== 0 && <Button>Оформить заказ</Button>}
        </div>
    );
}

export default Basket;
