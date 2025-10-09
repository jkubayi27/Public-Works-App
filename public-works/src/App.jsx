import { useState, useEffect } from 'react'
import Header from './Header'
import CreateOrder from './CreateArea'
import Footer from './Footer'
import Result from './Result'

function App() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5000/orders")
    .then(res => res.json())
    .then(data => setOrders(data))
  },[]);

  //turn back the data type of date in PG back to date OR turn it back at server-side.
  //add styling to indicate the status of the order through colouring.
  async function addOrder(newOrder) {
    setOrders(prevOrders => [...prevOrders,newOrder]);
    console.log(newOrder);
    const {ordernum,wardnum, orderdesc, date, trade} = newOrder;
    const response = await fetch('http://localhost:5000/add-order',{
      method: 'POST',
      headers: {"Content-type":"application/json"},
      body: JSON.stringify({ordernum,wardnum,orderdesc, date, trade}),
    });
    const data = await response.json();
    console.log("User added ",data);
  }

  async function filterByCompleted() {
    fetch("http://localhost:5000/completed-orders")
    .then(res => res.json())
    .then(data => setOrders(data))
  }

  return (
    <>
      <Header/>
      <CreateOrder onAdd={addOrder}/>
      <Result orders={orders} filter={filterByCompleted}/> 
      <Footer/>
    </>
  )
}

export default App
