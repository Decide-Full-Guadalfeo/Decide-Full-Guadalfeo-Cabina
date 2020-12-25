'use strict';
const { useState, useEffect } = React

const Navbar = ({ user }) => {

    const logout = () => {
        const data = { token };
        post("/gateway/authentication/logout/", data);
        setToken(null);
        setUser(null);
        document.cookie = 'decide=;';
    }

    return (
        <div>
            <p>This is a navbar</p>
            {true ? <button onClick={logout}>Logout</button>: null}
        </div>
    )
}

export default Navbar;