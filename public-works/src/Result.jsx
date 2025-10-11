import Order from './Order.jsx'
function Result(props) {
    return (
        <>
            <h2 className='filerHaeding'>Works Orders</h2>
            {props.orders.map((order,index) => {
                return (<Order key={order.ordernum} orderNum={order.ordernum} wardNum={order.wardnum} description={order.orderdesc} completion={order.completed}/>)
            })}
        </>
    )
}

export default Result;