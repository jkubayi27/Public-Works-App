import axios from "axios";
import { Link,useNavigate} from "react-router-dom";
import Nav from "./Nav";

function Header() {
    const navigate = useNavigate();
    async function logOut() {
        const response = await axios.get('http://localhost:5000/logout');
        console.log(response)
        if (!response) {
            console.log('session persists');
        } else {
            console.log('session expired');
        }
        navigate("/");
    }

    return (
        <div className="heading">
            <h1>Witbank General Hospital</h1>
            <button onClick={logOut} className="logOut">
                Logout
            </button>
            <Nav/>
        </div>
    )
}

export default Header;