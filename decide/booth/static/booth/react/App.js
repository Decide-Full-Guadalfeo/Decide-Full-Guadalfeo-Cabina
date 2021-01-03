'use strict';

import Login from "./Login/Login";
import Voting from "./Voting/Voting";
import Navbar from "./Navbar/Navbar"

const { useState, useEffect } = React;

const App = () => {

  /*############### STATE ###############*/
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(
    {
      lvl: null,
      msg: null,
    }
  )

  
  /*############### UTILITY FUNCTIONS ###############*/
  const post = (url, data) => {
    // Default options are marked with *
    var fdata = {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    };

    if (token) {
      fdata.headers['Authorization'] = 'Token ' + token;
    }

    return fetch(url, fdata)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(response.statusText);
        }
      });
  }

  const utils = {token, user, setToken, setUser, alert, setAlert, post}

  /*############### FUNCTIONALITY ###############*/
  const view = () => {
    if(user) {
      return(
        <div>
          <Voting utils={utils}/>
        </div>
      )
    }
    else{
      return(
        <Login utils={utils}/>
      )
    }
  }
  

  /*############### RETURN ###############*/
  return (
    <div className="App">
      <Navbar utils={utils}/>
      {/* <div class="welcome">
      <h1>Please vote {voting.id} - { voting.name }</h1>
      </div> */}
      {view()}
    </div>
  );

}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(<App />, domContainer);