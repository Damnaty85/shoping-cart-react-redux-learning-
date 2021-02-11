import React from 'react';

function SizeFilter({filterValue}) {
    const filterValues = [...new Set([].concat.apply([], filterValue))];

    return (
        <>
            <span>Фильтровать по размеру:</span>
            <select>
                <option value="">Все</option>
                {
                    filterValues.map((it) => (
                        <option value={it} key={it}>{it}</option>
                    ))
                }
            </select>
        </>
    );
}

export default SizeFilter;
