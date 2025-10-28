function ReportItem(props) {
    return (
        <div className='report'>
            <h2>Trade : {props.trade}</h2>
            <h3>Completed Orders : {props.complete}</h3>
            <h3>Incomplete Orders : {props.incomplete}</h3>
        </div>
    )
}

export default ReportItem;