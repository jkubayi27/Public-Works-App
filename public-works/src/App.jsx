import { useState, useEffect } from 'react'
import api from './api'
import Header from './Header'
import Filter from './FilterArea'
import Result from './Result'

function App() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to load orders', err));
  },[]);

  /*async function filterByCompleted() {
    fetch("http://localhost:5000/completed-orders")
    .then(res => res.json())
    .then(data => setOrders(data))
  }*/

  async function filterOrders(filter) {
    try {
      const response = await api.get('/filter-orders', {
        params: {trade: filter.trade, orderType: filter.orderType},
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error filtering data", error);
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
