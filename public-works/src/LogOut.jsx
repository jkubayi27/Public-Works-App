import api from "./api";
async function loggingOut() {
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

export function LogOut({showLog}) {
    return (
        <button className={!showLog ? 'logOut' : 'hidden' } onClick={loggingOut}>
            Logout
        </button>
    )
}