import api from "./api";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";

function Header() {
    const navigate = useNavigate();
    async function logOut() {
        try {
            await api.get('/logout');
        } catch (err) {
            // ignore errors; ensure client clears auth state anyway
            console.error('Logout error', err);
        }

        // clear client auth state
        localStorage.removeItem('authenticated');

        // do a hard redirect to the sign-in page to fully reset mounted components
        // use replace so the protected route isn't left in history
        window.location.replace('/');
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