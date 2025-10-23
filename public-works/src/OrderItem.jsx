import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
function OrderItem() {
    const [worksOrder,setWorksOrder] = React.useState({});
    const {id} = useParams();
    
    useEffect(() => {
    fetch(`http://localhost:5000/orders/${id}`)
    .then(res => res.json())
    .then(data => setWorksOrder(data[0]))
    },[]);

    console.log(worksOrder);

    function handleChange(e) {
        const {name,value} = e.target;
        setWorksOrder(prev => {
            return {...prev, [name] : value}
        })
    }

   const updateOrder  = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/orders/${id}`,worksOrder);
            console.log('User updated:', response.data);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    }
   
    //Perform a PUT/PATCH function when the form is sub,ited that updates the order in the database
    return (
        <>
        <Header display="block" redirect='/home'/>
        <div className="orderInput">
            <h2>Edit Works Order {id}</h2>
            <form className="inputForm">
                <input type="text" name="ordernum" value={worksOrder.ordernum} onChange={handleChange}/>
                <input type="text" name="wardnum" value={worksOrder.wardnum} onChange={handleChange}/>
                <input type="date" name="date" defaultValue={worksOrder.date} onChange={handleChange}/>
                <textarea name="orderdesc" rows="3" defaultValue={worksOrder.orderdesc} onChange={handleChange}></textarea>
                <label htmlFor="trade">Select trade : </label>
                <select name="trade" id="trade" value={worksOrder.trade} onChange={handleChange}>
                    <option value=""></option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Carpentry">Carpentry</option>
                </select>
                <textarea name="remark"
                    value={worksOrder.remark}
                    id="remark" 
                    placeholder="Enter any comments from artisan" 
                    rows="3" 
                    onChange={handleChange}>
                </textarea>
                <label htmlFor="completed">Is the works order completed : </label>
                <select name="completed" id="completed" value={worksOrder.completed} onChange={handleChange}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <button type="submit" onClick={updateOrder}>Update</button>
            </form>
        </div>
        </>
    )
}

export default OrderItem