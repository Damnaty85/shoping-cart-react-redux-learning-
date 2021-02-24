import React, { memo, useState } from 'react';
import Button from "./Button";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

function Card({ id, name, image, price, currency, category, sizes, votes, properties, addBasket, addedCount }) {
    const [activeSize, setActiveSize] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    const onSelectSize = (size) => {
        setActiveSize(size);
        setIsSelected(true);
    };

    const addProduct = () => {
        const obj = {
            id,
            name,
            image,
            price,
            currency,
            category,
            sizes: activeSize
        };
        addBasket(obj);
    };

    return (
        <div className="cards-item">
            <div className="cards-item__top">
                <img src={image} alt={name}/>
                <div className="cards-item__buying">
                <span className="cards-item__size">
                    {
                        sizes.map((size) => (
                            <span onClick={() => onSelectSize(size)}
                                  key={size}
                                  className={activeSize === size ? 'selected' : ''}
                            >
                                {size}
                            </span>
                        ))
                    }
                </span>
                    <Button onClick={addProduct} className={!isSelected && `disabled`} title={'Выберите размер'}>
                        <ShoppingBasketIcon/> Купить {addedCount && <span> ({addedCount})</span>}
                    </Button>
                </div>
            </div>
            <div className="cards-item__bottom">
                <p>{name} <span className="cards-item__price">{price} {currency}</span></p>
                <span className="cards-item__rating">Рейтинг: {((votes+31.25) / (5+10)).toFixed(1)}</span>
            </div>
        </div>
    );
}

export default memo(Card);
