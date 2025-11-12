import api from "./api";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { LogOut } from "./LogOut";

function Header({showLog,showNav}) {
    return (
        <div className="heading">
            <h1>Witbank General Hospital</h1>
            <LogOut showLog={showLog}/>
            <Nav showNav={showNav} />
        </div>
    )
}

export default Header;