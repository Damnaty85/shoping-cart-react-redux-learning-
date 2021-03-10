import React, {memo, useEffect, useRef, useState} from 'react';
import Button from "./common/Button";
import { BASE_URL } from "../redux/actions/types";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const SmartFilter = memo(function SmartFilter({ handleChangeFilters, handleClearFilters, filterActive }) {
    const content = useRef();
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

    const getKeys = (array) => {
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
            <div className={`smart-filter`}>
                {
                    getKeys(propertiesArray).map((props, index) => (
                        <div
                            className={`smart-filter__item`}
                            key={props}
                            style={{
                                margin: +active === index ? `10px 0`: `0`
                            }}
                        >
                            <span
                                className={`smart-filter__title`}
                                onClick={() => openedMenu(index)}
                            >{props}
                                <ExpandMoreIcon/>
                            </span>
                            <span
                                className={`smart-filter__values`}
                                style={{
                                    visibility: +active === index ? `visible`: `hidden`,
                                    height: +active === index ? `auto`: `0`,
                                    paddingTop: +active === index ? `10px`: `0`
                                }}
                                ref={content}
                            >
                                {
                                    getValues(propertiesArray, props).map((value, index) => (
                                        <Button
                                            className={`smart-filter__value`}
                                            key={`${value}_${index}`}
                                            onClick={handleChangeFilters}
                                        >{value}</Button>
                                    ))
                                }
                            </span>
                        </div>
                    ))
                }
                {
                    filterActive &&
                    <Button onClick={handleClearFilters} className={`smart-filter__reset`}>Сбросить фильтр</Button>
                }
            </div>
        </>
    )
});

export default SmartFilter;
