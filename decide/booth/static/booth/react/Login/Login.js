'use strict';
const { useState, useEffect } = React

const Login = ({ utils }) => {

    /*############### STATE ###############*/

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    /*############### UTILITY FUNCTIONS ###############*/
    const getUser = (tkn) => {
        var data = { token: tkn };
        utils.post("/gateway/authentication/getuser/", data)
            .then(data => {
                utils.setUser(data);
            }).catch(error => {
                console.log(error)//this.showAlert("danger", '{% trans "Error: " %}' + error);
            });
    }

    const init = () => {
        const cookies = document.cookie.split("; ");

        cookies.forEach((c) => {
            var cs = c.split("=");
            if (cs[0] == 'decide' && cs[1]) {
                utils.setToken(cs[1]);
                getUser(cs[1]);
            }
        });

        ElGamal.BITS = keybits;
    }

    const onSubmitLogin = (event) => {
        event.preventDefault();

        const form = { username, password };

        utils.post("/gateway/authentication/login/", form)
            .then(data => {
                document.cookie = 'decide=' + data.token + ';';
                utils.setToken(data.token);
                getUser(data.token);
            })
            .catch(error => {
                utils.setAlert({ lvl: 'danger', msg: 'Error: ' + error, });
            });
    }


    /*############### FUNCTIONALITY ###############*/

    useEffect(() => {
        init();
    }, [])


    /*############### RETURN ###############*/
    return (
        <div className="login">
            <form onSubmit={onSubmitLogin}>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />

                <button>Login</button>

            </form>
        </div>
    );
}
export default Login;