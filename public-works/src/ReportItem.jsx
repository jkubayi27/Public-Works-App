function ReportItem(props) {
    return (
        <div className='report'>
            <h2>Trade : {props.trade}</h2>
            <h3>Total Orders : {props.occurence}</h3>
            <h3>Completed Orders : </h3>
            <h3>Incomplete Orders : </h3>
        </div>
    )
}

export default ReportItem;