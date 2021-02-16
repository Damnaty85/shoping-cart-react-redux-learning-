import React, { memo, useState, useEffect} from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const sortType = [
    { name: 'новизне', type: 'id', order: 'desc' },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавиту', type: 'name', order: 'asc' },
    { name: 'рейтингу', type: 'votes', order: 'desc' },
];

const Sorting = memo(function Sorting({ activeSortType, onSelectSortType }) {
    const sortRef = React.useRef();
    const [visible, setVisible] = useState(false);
    const activeLabel = sortType.find((obj) => obj.type === activeSortType).name;

    const toggleVisiblePopup = () => {
        setVisible(!visible);
    };

    const onSelectItem = (type) => {
        if (onSelectSortType) {
            onSelectSortType(type);
        }
        setVisible(false);
    };

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(sortRef.current)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div ref={sortRef} className="cards-sort__wrapper">
            <b>Сортировать по: </b>
            <span onClick={toggleVisiblePopup}>{activeLabel} <ArrowDropDownIcon/></span>
            {
                visible &&
                <ul className="cards-sort__popup">
                    {sortType &&
                    sortType.map((obj, index) => (
                        <li
                            onClick={() => onSelectItem(obj)}
                            className={activeSortType === obj.type ? 'active' : ''}
                            key={`${obj.type}_${index}`}>
                            {obj.name}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
});

export default Sorting;
