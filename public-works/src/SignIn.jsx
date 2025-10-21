import axios from "axios";
import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function SignIn() {
    const [user,setUser] = useState({username : "", password : ""});
    const navigate = useNavigate();

    function handleChange(e) {
        const {name,value} = e.target;
        setUser(prev => ({...prev, [name] : value}));
    }

    async function submitLogin(e) {
        e.preventDefault();
        const response = await axios.get('http://localhost:5000/authenticate',{
            params : {username : user.username, password : user.password},
        });
        if (response.data == true) {
            navigate('/home');
        } else {
            alert('Incorrect username or password');
        }
    }
    return (
        <>
            <Header/>
            <div className="orderInput">
                <form className="inputForm">
                    <label htmlFor="username">Username : </label>
                    <input type="text" name="username" id="username" onChange={handleChange} value={user.username}/>
                    <label htmlFor="password">Password : </label>
                    <input type="text" name="password" id="password" onChange={handleChange} value={user.password}/>
                    <button type="submit" onClick={submitLogin}>Log In</button>
                </form>
            </div>
        </>
    )
}

export default SignIn;