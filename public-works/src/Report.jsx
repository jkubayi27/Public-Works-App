import { useState } from "react"
import Header from "./Header"
import axios from "axios";
import ReportItem from "./ReportItem";
function Report() {

    const [trade,setTrade] = useState({
        trade: 'All'
    });

    const [reportData,setReportData] = useState([]);

    function handleChange(e) {
        const {value,name} = e.target;
        setTrade(prev => {
            return {...prev, [name] : value}
        });
    }

    //function gets data of number of each trades occurences
    async function generateReport() {
        try{
            const result = await axios.get('http://localhost:5000/report');
            console.log(result.data);
            setReportData(result.data);
            //Add mor fech requests to make the report more detailed
        } catch (err) {
            console.log('Error loading data to report',err);
        }  
    }

    function handleSubmit(e) {
        e.preventDefault();
        generateReport();
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
                    <button type="submit" onClick={handleSubmit}>Get report</button>
                </form>
            </div>
            <div className="orderInput">
                {reportData.map((data,index) => (
                    <ReportItem
                        key={index}
                        trade={data.trade}
                        complete={data.complete}
                        incomplete={data.incomplete}
                    />
                ))}
            </div>
        </>
    )
}

export default Report;