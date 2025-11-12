import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import Filter from './FilterArea'
import Result from './Result'

function App() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5000/orders")
    .then(res => res.json())
    .then(data => setOrders(data))
  },[]);

  /*async function filterByCompleted() {
    fetch("http://localhost:5000/completed-orders")
    .then(res => res.json())
    .then(data => setOrders(data))
  }*/

  async function filterOrders(filter) {
    try {
      const response = await axios.get('http://localhost:5000/filter-orders',{
        params: {trade : filter.trade, orderType : filter.orderType},
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error filtering data");
    }
  }

  return (
    <>
      <Header/>
      <Filter filterOrders={filterOrders}/>
      <Result orders={orders}/>
    </>
  )
}

export default App
