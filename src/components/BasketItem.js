import React from 'react';

function BasketItem({id, image, name, category, size,  price, count, handleRemoveBasketItem}) {
    return (
        <div className="basket-item" key={id}>
            <div className="basket-item__image"><img src={image} alt={name}/></div>
            <div className="basket-item__left">
                <h3>{name} {category}</h3>
                <p>Размер: {size}</p>
                <p>{price} руб. X {count} шт.</p>
                <div className="basket-item__quantity">
                    <button>-</button>
                    <span>{count}</span>
                    <button>+</button>
                </div>
                <button onClick={() => handleRemoveBasketItem(id)}>Удалить товар</button>
            </div>
        </div>
    );
}

export default BasketItem;
