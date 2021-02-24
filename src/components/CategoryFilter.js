import React, {memo, useEffect, useState} from 'react';
import Button from "./Button";
import {BASE_URL} from "../redux/actions/types";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CategoryFilter = memo(function CategoryFilter({ handleChangeCategories }) {
    const [active, setActive] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData () {
            await fetch(`${BASE_URL}`)
                .then(response => response.json())
                .then(data => setProducts(data))
        }
        fetchData();
    }, []);

    const propertiesArray = Array.from(products, ({properties}) => properties);

    const getArrayProp = (array) => {
        const newArray = [];
        for (let obj of array) {
            newArray.push(Object.keys(obj))
        }
        const allValues = [...new Set([].concat.apply([], newArray))];

        return allValues;
    };

    const getValues = (array, key) => {
        const arrayValues = [];
        for (let arr of array) {
            if (typeof arr[key] !== 'undefined' && arr[key] !== null){
                arrayValues.push(arr[key]);
            }
        }

        const allValues = [...new Set([].concat.apply([], arrayValues))];

        return allValues;
    };

    const openedMenu = (index) => {
        setActive(index);
    };

    return (
        <>
            <div className="smart-filter">
                {
                    getArrayProp(propertiesArray).map((props, index) => (
                        <div className="smart-filter__item"
                             key={props}>
                            <span
                                className={`smart-filter__title ${+active === index ? 'active' : ''}`}
                                onClick={() => openedMenu(index)}>{props}
                                <ExpandMoreIcon/>
                            </span>
                            <span  className="smart-filter__values">
                                {
                                    getValues(propertiesArray, props).map((value, index) => (
                                        <Button
                                            className="smart-filter__button"
                                            key={`${value}_${index}`}
                                            onClick={handleChangeCategories}
                                        >{value}</Button>
                                    ))
                                }
                            </span>
                        </div>
                    ))
                }
            </div>
        </>
    )
});

export default CategoryFilter;
