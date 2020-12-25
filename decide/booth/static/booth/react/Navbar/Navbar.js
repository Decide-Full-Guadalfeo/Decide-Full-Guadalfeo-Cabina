'use strict';
const { useState, useEffect } = React

const Navbar = ({ utils }) => {

    const logout = () => {
        const data = { token: utils.token };
        utils.post("/gateway/authentication/logout/", data);
        utils.setToken(null);
        utils.setUser(null);
        document.cookie = 'decide=;';
    }

    const closeAlert = () => {
        utils.setAlert({lvl:null,msg:null});
    }
    return (
        <div className='navbar'>
            <span>Decide</span>

            {utils.user ? <button onClick={logout}>Logout</button>: null}

            {utils.alert.lvl ? 
                
                <div className={'alert '+utils.alert.lvl}>
                    <p>{utils.alert.msg}</p>
                    <button onClick={closeAlert}>close</button>
                </div>
                
            : null}
            
        </div>
    )
}

export default Navbar;