import { useState } from "react";

//Add button to set order as completed
//Create a way for user to explain reason as to why the works order is incomplete
function Order(props) {
    let styling = props.completion === true ? "order" : "incomplete-order";
    return (
        <div className={styling}>
            <h3>Order Number : {props.orderNum}</h3>
            <h4>Ward Number : {props.wardNum}</h4>
            <p>{props.description}</p>
        </div>
    )
}

export default Order;