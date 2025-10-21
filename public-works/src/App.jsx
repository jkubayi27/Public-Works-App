import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import CreateOrder from './CreateArea'
import Filter from './FilterArea'
import Result from './Result'
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";

function App() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5000/orders")
    .then(res => res.json())
    .then(data => setOrders(data))
  },[]);

  async function addOrder(newOrder) {
    setOrders(prevOrders => [...prevOrders,newOrder]);
    //console.log(newOrder);
    const {ordernum,wardnum, orderdesc, date, trade} = newOrder;
    const response = await fetch('http://localhost:5000/add-order',{
      method: 'POST',
      headers: {"Content-type":"application/json"},
      body: JSON.stringify({ordernum,wardnum,orderdesc, date, trade}),
    });
    const data = await response.json();
    console.log("User added ",data);
  }

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
      <CreateOrder onAdd={addOrder}/>
      <Filter filterOrders={filterOrders}/>
      <Result orders={orders}/>
    </>
  )
}

export default App
