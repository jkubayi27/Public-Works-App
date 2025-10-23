import { Link } from "react-router-dom";

function Header(props) {
    const displayType =  props.display == null ? "none" : props.display;
    const  customStyle = {
        display: displayType
    }
    return (
        <div className="heading">
            <button style={customStyle}>
                <Link to={props.redirect}>Back</Link>
            </button>
            <h1>Witbank General Hospital</h1>
        </div>
    )
}

export default Header;