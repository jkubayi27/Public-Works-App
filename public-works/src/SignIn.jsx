import api from "./api";
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
           const res = await api.post("/login", { username: user.username, password: user.password });
           if (res.data.valid === true) {
             // store JWT for future requests
             localStorage.setItem('accessToken', res.data.accessToken);
             localStorage.setItem('authenticated', 'true');
             navigate('/home');
           }
       } catch(err) {
           alert('Incorrect username or password');
           localStorage.removeItem('authenticated');
           localStorage.removeItem('accessToken');
       }
    }
    return (
        <>
            <Header showLog='hidden' showNav='hidden'/>
            <div className="orderInput">
                <form className="inputForm">
                    <label htmlFor="username">Username : </label>
                    <input type="text" name="username" id="username" onChange={handleChange} value={user.username} autoComplete="off"/>
                    <label htmlFor="password">Password : </label>
                    <input type="password" name="password" id="password" onChange={handleChange} value={user.password} autoComplete="off"/>
                    <button type="submit" className="submit-btn" onClick={submitLogin}>Log In</button>
                </form>
            </div>
        </>
    )
}

export default SignIn;