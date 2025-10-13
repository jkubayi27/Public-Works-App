import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
function OrderItem() {
    const {id} = useParams();
    useEffect(() => {
        try {
            const response = axios.get(`http://localhost:5000/get-order/${id}`);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    })
    //Get the order that matches the id
    //Perform a PUT/PATCH function when the form is sub,ited that updates the order in the database
    return (
        <>
           <h2>Work Order Number {id}</h2>
        </>
    )
}

export default OrderItem