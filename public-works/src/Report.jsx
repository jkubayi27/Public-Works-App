import { useState } from "react"
import Header from "./Header"
import axios from "axios";
function Report() {

    const [trade,setTrade] = useState({
        trade: 'All'
    });

    function handleChange(e) {
        const {value,name} = e.target;
        setTrade(prev => {
            return {...prev, [name] : value}
        });
    }

    //function gets data of number of each trades occurences
    function generateReport() {
        const result = axios.get('http://localhost:5000/report')
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <Header/>
            <div className="orderInput">
                <h1>Performance Report</h1>
                <form className="inputForm">
                    <label htmlFor="trade">Trade: </label>
                    <select name="trade" id="trade" onChange={handleChange}>
                        <option value="All">All</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="Plumbing">Plumbing</option>
                    </select>
                    <button type="submit" onClick={handleChange}>Get report</button>
                </form>
            </div>
            <div className="report">
                <h2></h2>
            </div>
        </>
    )
}