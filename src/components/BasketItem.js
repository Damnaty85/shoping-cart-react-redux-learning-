import React from 'react';
import Button from "./common/Button";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

function BasketItem({id, image, name, category, size,  price, currency, count, removeBasketItemHandler, plusesItemHandler, minusesItemHandler}) {

    return (
        <div className="basket-items" key={id}>
            <div className="basket-items__image"><img src={image} alt={name}/></div>
            <div className="basket-items__left">
                <h3>{name}</h3>
                <p><b>Категория: </b>{category}</p>
                <div className="basket-items__props"><span>Размер: {size}</span> <span>Стоимость: {price} {currency}</span></div>
                <div className="basket-items__quantity">
                    <div className="button button-minus" onClick={() => minusesItemHandler(id)}>
                        <RemoveRoundedIcon/>
                    </div>
                    <b>{count}  шт.</b>
                    <div className="button basket-plus" onClick={() => plusesItemHandler(id)}>
                        <AddRoundedIcon/>
                    </div>
                </div>
                <Button onClick={() => removeBasketItemHandler(id)}>Удалить товар</Button>
            </div>
        </div>
    );
}

export default BasketItem;
