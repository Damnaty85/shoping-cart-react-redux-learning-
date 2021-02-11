import React, { memo } from 'react';

function Card({ id, name, image, price, category, sizes, addBasket, addedCount }) {
    const [activeSize, setActiveSize] = React.useState('');

    const onSelectSize = (size) => {
        setActiveSize(size);
    };

    const addProduct = () => {
        const obj = {
            id,
            name,
            image,
            price,
            sizes: activeSize
        };
        addBasket(obj);
    };

    return (
        <div className="card">
            <div className="card__top">
                <img src={image} alt={name}/>
            </div>
            <div className="card__bottom">
                <h4>{name}</h4>
                <span className="card__size">
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
                <span className="card__bottom _row">
                    <span className="card__price">{price} руб.</span>
                    <button onClick={addProduct}>
                        Добавить {addedCount && <span> ({addedCount})</span>}
                    </button>
                </span>
            </div>
        </div>
    );
}

export default memo(Card);
