import { useState } from "react"

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

    async function submitNote(e) {
        e.preventDefault();
        props.onAdd(newOrder);
    }

    return (
        <div className="orderInput">
            <h2>Create Works Order</h2>
            <form className="inputForm">
                <input type="text" name="ordernum" placeholder="Enter Order Number" onChange={handleChange}/>
                <input type="text" name="wardnum" placeholder="Enter Ward Number" onChange={handleChange}/>
                <input type="date" name="date" onChange={handleChange}/>
                <textarea name="orderdesc" rows="3" onChange={handleChange}></textarea>
                <label htmlFor="trade">Select trade : </label>
                <select name="trade" id="trade" onChange={handleChange}>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Carpentry">Carpentry</option>
                </select>
                <button type="submit" onClick={submitNote}>Submit</button>
            </form>
        </div>
    )
}

export default CreateOrder