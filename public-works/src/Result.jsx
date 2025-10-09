import Order from './Order.jsx'
function Result(props) {
    return (
        <>
            <button onClick={props.filter}>Filter by completed</button>
            {props.orders.map((order,index) => {
                return (<Order orderNum={order.ordernum} wardNum={order.wardnum} description={order.orderdesc} completion={order.completed}/>)
            })}
        </>
    )
}

export default Result;