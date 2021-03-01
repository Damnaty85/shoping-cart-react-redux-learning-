import React, {useRef} from 'react';
import {LazyImage} from "./LazyImage";

function FastView({ name, moreImage }) {
    const mainImage = useRef();

    const changeImage = (evt) => {
        const imageUrl = evt.target.src;
        mainImage.current.querySelector('IMG').setAttribute('src', imageUrl);
    };

    return (
        <div className={'fast-view'}>
            <div className={"fast-view__description"}>
                <h2>{name}</h2>
            </div>
            <div className={"fast-view__gallery"}>
                <div className={"fast-view__thumbs"}>
                    {
                        moreImage.map((it) => (
                            <LazyImage src={it} key={it} onMouseEnter={changeImage}/>
                        ))
                    }
                </div>
                <div className={"fast-view__image"} ref={mainImage}>
                    {
                        moreImage[0] &&
                        <LazyImage src={moreImage[0]} alt={name}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default FastView;
