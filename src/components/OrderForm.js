import React from 'react';
import Input from "./Input";

function OrderForm() {
    return (
        <div>
            <Input type={"text"} name={"name"} placeHolder={"Ваше имя"} required={"required"}/>
            <Input type={"phone"} name={"phone"} placeHolder={"Ваш телефон"} required={"required"}/>
            <Input type={"mail"} name={"email"} placeHolder={"Ваш email"} required={"required"}/>
            <Input type={"address"} name={"address"} placeHolder={"Ваш адрес"} required={"required"}/>
        </div>
    );
}

export default OrderForm;
