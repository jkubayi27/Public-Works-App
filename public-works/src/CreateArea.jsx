import { useState } from "react"
import Header from "./Header";
import api from "./api";
function CreateOrder(props) {
    const [newOrder,setNewOrder] = useState({
        ordernum : '', 
        wardnum : '',
        orderdesc : '',
        date : undefined,
        trade : ''
    });

    function handleChange(e) {
        const {name,value} = e.target ;
        setNewOrder(prev => {
            return {...prev, [name] : value}
        })
    }

    async function addOrder(newOrder) {
        const {ordernum,wardnum, orderdesc, date, trade} = newOrder;
        const response = await api.post('/add-order', { ordernum, wardnum, orderdesc, date, trade });
        if (response.data) {
            alert('Works Order successfully created');
        }
    }

    function isFormFilled() {
        let filled = true;
        if (newOrder.ordernum === '' || 
            newOrder.wardnum === '' || 
            newOrder.orderdesc === '' || 
            newOrder.date === undefined || 
            newOrder.trade === '') {
                filled = false;
            }
        return filled;
    }

    async function submitNote(e) {
        e.preventDefault();
        const isFormValid = isFormFilled();
        if (isFormValid) {
            await addOrder(newOrder);
        } else {
            alert("Fill out the form entirely")
        }
    }

    return (
        <>
        <Header/>
        <div className="orderInput">
            <h2>Create Works Order</h2>
            <form className="inputForm">
                <input type="text" name="ordernum" placeholder="Enter Order Number" onChange={handleChange} autoComplete="off" required/>
                <input type="text" name="wardnum" placeholder="Enter Ward Number" onChange={handleChange} autoComplete="off" required/>
                <input type="date" name="date" onChange={handleChange} autoComplete="off" required/>
                <textarea name="orderdesc" 
                rows="3" 
                onChange={handleChange}
                placeholder="Enter the work order description"></textarea>
                <label htmlFor="trade">Select trade : </label>
                <select name="trade" id="trade" onChange={handleChange} required>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Carpentry">Carpentry</option>
                </select>
                <button type="submit" onClick={submitNote}>Submit</button>
            </form>
        </div>
        </>
    )
}

export default CreateOrder