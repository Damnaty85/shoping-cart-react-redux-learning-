import React, {memo, useEffect, useState} from 'react';

const CategoryFilter = memo(function CategoryFilter({allCategories, activeCategory, handleChangeCategories}) {
    const categoriesValue = [...new Set([].concat.apply([], allCategories))];
    const [state, setState] = useState([]);

    useEffect(() => {
        setState(categoriesValue);
    }, []);

    return (
        <>
            <span>Фильтровать по категории: </span>
            <select value={activeCategory} onChange={handleChangeCategories}>
                <option value="">Все</option>
                {
                    state.map((it) => (
                        <option value={`${it}`} key={it}>{it}</option>
                    ))
                }
            </select>
        </>
    )
});

export default CategoryFilter;
