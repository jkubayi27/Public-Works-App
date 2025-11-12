import { Link } from "react-router-dom"

function Nav ({showNav}) {
    return (
        <div className={!showNav ? "head-links" : 'hidden'}>
            <button className="head-btn"><Link to='/home'>Home</Link></button>
            <button className="head-btn"><Link to='/report'>Report</Link></button>
            <button className="head-btn"><Link to='/create'>Create Works Order</Link></button>
        </div>
    )
}

export default Nav