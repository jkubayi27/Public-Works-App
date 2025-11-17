import { useState } from "react"
import Header from "./Header";
function CreateOrder(props) {
    const [newOrder,setNewOrder] = useState({
        ordernum : 0, 
        wardnum : 0,
        orderdesc : '',
        date : '2025/01/01',
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
        const response = await fetch('http://localhost:5000/add-order',{
        method: 'POST',
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({ordernum,wardnum,orderdesc, date, trade}),
        });
        const data = await response.json();
        alert('Works Order successfully created');
    }

    async function submitNote(e) {
        e.preventDefault();
        addOrder(newOrder);
    }

    return (
        <>
        <Header/>
        <div className="orderInput">
            <h2>Create Works Order</h2>
            <form className="inputForm">
                <input type="text" name="ordernum" placeholder="Enter Order Number" onChange={handleChange} autoComplete="off"/>
                <input type="text" name="wardnum" placeholder="Enter Ward Number" onChange={handleChange} autoComplete="off"/>
                <input type="date" name="date" onChange={handleChange} autoComplete="off"/>
                <textarea name="orderdesc" 
                rows="3" 
                onChange={handleChange}
                placeholder="Enter the work order description"></textarea>
                <label htmlFor="trade">Select trade : </label>
                <select name="trade" id="trade" onChange={handleChange}>
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