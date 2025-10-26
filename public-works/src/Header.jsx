import axios from "axios";
import { Link } from "react-router-dom";

function Header() {

    async function logOut() {
        const response = await axios.get('http://localhost:5000/logout');
        console.log(response)
        if (!response) {
            console.log('session persists');
        } else {
            console.log('session expired');
        }
    }

    return (
        <div className="heading">
            <h1>Witbank General Hospital</h1>
            <button onClick={logOut}>
                Logout
            </button>
            <nav>
                <ul>
                    <li><Link to='/create'>Create Works Order</Link></li>
                    <li><Link to='/report'>Report</Link></li>
                    <li><Link to='/home'>Home</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;