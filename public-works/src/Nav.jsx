import { Link } from "react-router-dom"

function Nav (props) {
    const show = {}
    return (
        <div className="head-links">
            <ul className="nav-links">
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/report'>Report</Link></li>
                <li><Link to='/create'>Create Works Order</Link></li>
            </ul>
        </div>
    )
}

export default Nav