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
        try {
             const res = await axios.post("http://localhost:5000/login", { username: user.username, password: user.password });
             if (res.data.valid == true) {
                navigate('/home');
             }
        } catch(err) {
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