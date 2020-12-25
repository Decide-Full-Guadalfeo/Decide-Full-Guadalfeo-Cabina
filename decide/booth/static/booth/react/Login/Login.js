'use strict';
const { useState, useEffect } = React

const Login = ({ post, setToken, setUser }) => {

    /*############### STATE ###############*/

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    /*############### UTILITY FUNCTIONS ###############*/
    const getUser = (tkn) => {
        var data = { token: tkn };
        post("/gateway/authentication/getuser/", data)
            .then(data => {
                setUser(data);
            }).catch(error => {
                console.log(error)//this.showAlert("danger", '{% trans "Error: " %}' + error);
            });
    }

    const init = () => {
        const cookies = document.cookie.split("; ");

        cookies.forEach((c) => {
            var cs = c.split("=");
            if (cs[0] == 'decide' && cs[1]) {
                setToken(cs[1]);
                getUser(cs[1]);
            }
        });

        ElGamal.BITS = keybits;
    }

    const onSubmitLogin = (event) => {
        event.preventDefault();

        const form = { username, password };

        post("/gateway/authentication/login/", form)
            .then(data => {
                document.cookie = 'decide=' + data.token + ';';
                setToken(data.token);
                getUser(data.token);
            })
            .catch(error => {
                console.log(error)//this.showAlert("danger", '{% trans "Error: " %}' + error);
            });
    }


    /*############### FUNCTIONALITY ###############*/

    useEffect(() => {
        init();
    }, [])


    /*############### RETURN ###############*/
    return (
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
    );
}
export default Login;