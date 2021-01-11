import Voting from "./Voting/Voting";
import Navbar from "./Navbar/Navbar";
import i18n from "i18next";


const { useState, useEffect } = React;

const App = () => {

  /*#################################################################*/
  /*############################ LANGUAGES ##########################*/
  /*#################################################################*/

  const en = {
    current: "en",
    prev: "Prev",
    next: "Next",
    vote: "Vote",
    modal_button: "Voting guide",
    modal_title: "Voting guide",
    modal_body: "Welcome to the voting portal of Decide! To register "+
    "your vote, click on the cards, and they will flip. You can only "+
    "choose one per question. If this is a general voting in the final "+
    "question, you can choose more than one, but a maximum of ten, and five men and five women.",
    language_button: "Switch to spanish",
    modal_close_button: "Ok, let's go!"

  };
  const es = {
    current: "es",
    prev: "Previo",
    next: "Siguiente",
    vote: "Votar",
    modal_button: "Guía de votación",
    modal_title: "Guía de votación",
    modal_body: "¡Bienvenido al portal de votaciones de Decide! Para registrar " +
      "tu voto, solo tienes que pulsar en una de las cartas, y esta se " +
      "girará. Solo puedes elegir uno por " +
      "pregunta. SI es una votación general, en la pregunta final puedes elegir más de uno,"+
      " pero un máximo de 10 candidatos, 5 hombres y 5 mujeres.",
    language_button: "Cambiar a inglés",
    modal_close_button: "Entendido, ¡vamos allá!"
  };

  /*#################################################################*/
  /*####################### UTILITY FUNCTIONS #######################*/
  /*#################################################################*/

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const post = (url, data) => {
    var fdata = {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      method: "POST",
    };

    if (votingUserData) {
      fdata.headers["Authorization"] = "Token " + votingUserData.token;
    }

    return fetch(url, fdata).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(response.statusText);
      }
    });
  };

  const getVotingUserData = () => {
    utils
      .post("/authentication/decide/getVotingUser/")
      .then((res) => {
        setVotingUserData(res);
      })
      .catch((error) => {
        console.log(error); //this.showAlert("danger", '{% trans "Error: " %}' + error);
      });
  };

  const changeLanguage = () => {
    if (lang.current === "es") {
      setLang(en)
    } else {
      setLang(es)
    }
  }

  /*#####################################################*/
  /*####################### STATE #######################*/
  /*#####################################################*/

  const [votingUserData, setVotingUserData] = useState(null);
  const [alert, setAlert] = useState({ lvl: null, msg: null });
  const [lang, setLang] = useState(es);

  /*#############################################################*/
  /*####################### FUNCTIONALITY #######################*/
  /*#############################################################*/

  //Run only once
  useEffect(() => {
    getVotingUserData();
  }, []);

  const utils = { alert, setAlert, post, votingUserData, lang };

  /*####################################################*/
  /*####################### VIEW #######################*/
  /*####################################################*/

  return (
    <div className="App">
      <Navbar utils={utils} />

      {votingUserData && <Voting utils={utils} />}

      <button onClick={changeLanguage}>{lang.language_button}</button>
    </div>
  );
};

const domContainer = document.querySelector("#react-root");
ReactDOM.render(<App />, domContainer);
