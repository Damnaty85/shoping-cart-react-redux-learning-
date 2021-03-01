import React from 'react';

function Button({onClick, children, className, title}) {
    return (
        <button className={`primary ${className ? className : ""}`} onClick={onClick} title={title}>{children}</button>
    );
}

export default Button;
