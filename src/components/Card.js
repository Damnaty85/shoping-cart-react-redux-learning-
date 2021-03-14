import React, { memo, useRef, useState } from 'react';
import FastView from "./FastView";
import { LazyImage } from "./common/LazyImage";
import Modal from "./common/Modal";
import Button from "./common/Button";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const Card = memo(({ id, name, image, price, currency, properties, sizes, votes, moreImage, addBasket, addedCount }) => {
    const modalRef = useRef();
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
            category: properties.Категория,
            sizes: activeSize
        };
        addBasket(obj);
    };

    const openModal = () => {
        modalRef.current.displayingModal();
    };

    return (
        <div className="cards-item">
            <div className="cards-item__top">
                <LazyImage src={image} alt={name}/>
                <div className="cards-item__buying">
                    <span className="cards-item__size">
                        {
                            sizes.map((size) => (
                                <span onClick={() => onSelectSize(size)}
                                      key={size}
                                      className={activeSize === size ? `selected` : ''}
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
                <Button onClick={openModal} className={`_fast-view`}>Смотреть ещё фото</Button>
            </div>
            <div className="cards-item__bottom">
                <p>{name} <span className="cards-item__price">{price} {currency}</span></p>
                <span className="cards-item__rating">Рейтинг: {((votes+31.25) / (5+10)).toFixed(1)}</span>
            </div>
            <Modal ref={modalRef}>
                <FastView
                    name={name}
                    moreImage={moreImage}
                />
            </Modal>
        </div>
    );
});

export default Card;
