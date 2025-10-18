import Header from "./Header";

function signIn() {
    return (
        <>
            <Header/>
            <form className="inputForm">
                <label htmlFor="username">Username : </label>
                <input type="text" name="username" id="username"/>
                <button type="submit">Log In</button>
            </form>
        </>
    )
}

export default signIn;