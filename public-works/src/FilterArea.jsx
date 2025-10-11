import { useState } from "react"

function Filter(props) {
    //Trade state
    const [filter,setFilter] = useState({
        trade : '',
        orderType : ''
    });

    //SetTrade handler
    function handleChange(e) {
        const {name,value} = e.target ;
        setFilter(prev => {
            return {...prev, [name] : value}
        })
    }

    //Use state function
    function submitFilters(e) {
        e.preventDefault();
        props.filterOrders(filter)
    }
    
    return (
    <div className="orderInput">
        <h2>Filter & Search</h2>
        <form className="inputForm">
            <label htmlFor="trade">Select trade: </label>
            <select name="trade" id="trade" onChange={handleChange}>
                <option value=""></option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Carpentry">Carpentry</option>
            </select>
            <label htmlFor="orderType">Select order type: </label>
            <select name="orderType" id="orderType" onChange={handleChange}>
                <option value=""></option>
                <option value="Completed">Completed</option>
                <option value="Incompleted">Incompleted</option>
            </select>
            <button type="submit" onClick={submitFilters}>View Orders</button>
        </form>
     </div>
    )
    
}

export default Filter