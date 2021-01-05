'use strict';

import Login from "./Login/Login";
import Voting from "./Voting/Voting";
import Navbar from "./Navbar/Navbar"

const { useState, useEffect } = React;

const App = () => {

  /*############### STATE ###############*/
  const [options, setOptions] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(
    {
      lvl: null,
      msg: null,
    }
  )


  /*############### UTILITY FUNCTIONS ###############*/
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const post = (url, data) => {
    // Default options are marked with *
    var fdata = {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
      method: 'POST',
    };

    if (options) {
      fdata.headers['Authorization'] = 'Token ' + options.token;
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

  const utils = { token, user, setToken, setUser, alert, setAlert, post }

  const getVotingUser = () => {
    var data = null;
    data = utils.post("/authentication/decide/getVotingUser/", data)
      .catch(error => {
        console.log(error)//this.showAlert("danger", '{% trans "Error: " %}' + error);
      });
    return data
  }

  const getOptions = () => {
    if (!options) {
      const data = getVotingUser()

      data.then((value) => {
        setOptions(value)
      })
    }
  }

  /*############### FUNCTIONALITY ###############*/

  const view = (value) => {
    if (value) {
      return (
        <div>
          <Voting utils={utils} value={value} />
        </div>
      )
    }
  }
  

  /*############### RETURN ###############*/
  return (
    <div className="App">
      <Navbar utils={utils} />
      <h1>Please vote {voting.id} - {voting.name}</h1>
      {getOptions()}
      {view(options)}
    </div>
  );


}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(<App />, domContainer);