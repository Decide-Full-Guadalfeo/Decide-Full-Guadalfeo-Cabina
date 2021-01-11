"use strict";

const { useState, useEffect } = React;

let firstRender = true
let votingType = null
let alumList = null

let voted = false;


const Voting = ({ utils }) => {
  /*#################################################################*/
  /*####################### UTILITY FUNCTIONS #######################*/
  /*#################################################################*/

  const dictionary = {
    Man: "1",
    Woman: "2",
    Other: "3",
    Software: "1",
    "Computer Technology": "2",
    "Information Technology": "3",
    Health: "4",
    First: "1",
    Second: "2",
    Third: "3",
    Fourth: "4",
    Master: "5",
  };

  const getVotingType = () => {
    let res = "";
    if (voting.tipo === "PV") res = "primary";
    else if (voting.tipo === "GV")
      res = "general";
    else {
      res = "error";
      console.log("error"); //setAlert()
    }

    return res;
  };

  const bigpk = {
    p: BigInt.fromJSONObject(voting.pub_key.p.toString()),
    g: BigInt.fromJSONObject(voting.pub_key.g.toString()),
    y: BigInt.fromJSONObject(voting.pub_key.y.toString()),
  };

  const encrypt = (options) => {
    const bigmsg = BigInt.fromJSONObject(options);
    const cipher = ElGamal.encrypt(bigpk, bigmsg);
    return { 'a': cipher.alpha.toString(), 'b': cipher.beta.toString() };

  };

  const encryptAll = (options) => {
    for (let o in options) {
      console.log(options[o])
      if (Array.isArray(options[o])) {
        for (let p in options[o]) {
          options[o][p] = encrypt(options[o][p].toString())
        }
      } else if (dictionary[options[o]]) {
        options[o] = encrypt(dictionary[options[o]])

      } else {
        options[o] = encrypt(options[o].toString());
      }
    }
    console.log(options);
    return options;
  };

  const getGenresByIds = async (ids) => {
    let res = null;

    await utils
      .post("/authentication/decide/getGenresByIds/", ids)
      .then((result) => {
        res = result;
      })
      .catch((error) => {
        console.log(error); //this.showAlert("danger", '{% trans "Error: " %}' + error);
      });

    return res.genres;
  };

  const checkRestrictions = async (ids) => {
    let res = true;

    let genres = await getGenresByIds(ids);
    let males = 0;
    let females = 0;
    let others = 0;

    for (let i = 0; i < genres.length; i++) {
      if (genres[i] === "Man") males = males + 1;
      else if (genres[i] === "Woman") females = females + 1;
      else others = others + 1;
    }

    if (males > 5 || females > 5 || males + females + others > 10) res = false;

    return res;
  };

  const getInput = async () => {
    let res = {};

    let questions = document.getElementsByClassName("question");

    let cont1 = 0
    for (let i = 0; i < questions.length; i++) {
      const titulo = questions[i].children[0].innerHTML;
      let inputs = questions[i].getElementsByTagName("input");
      for (let j = 0; j < inputs.length; j++) {
        if (inputs[j].checked) {
          res[titulo] = inputs[j].value;
          cont1 = cont1 + 1
        }
      }
    }
    res["sex"] = utils.votingUserData.sex;
    res["age"] = utils.votingUserData.age;
    res["grade"] = utils.votingUserData.grade;
    res["year"] = utils.votingUserData.year;

    if (votingType === "general") {
      let la = document.getElementsByClassName("alum-list");
      let alumns = [];
      let inputs = la[0].getElementsByTagName("input");
      let cont2 = 0

      for (let j = 0; j < inputs.length; j++) {
        if (inputs[j].checked){
          alumns.push(inputs[j].value);
          cont2 = cont2 + 1
        } 
      }
      res[la[0].children[0].innerHTML] = alumns;

      const valid = await checkRestrictions(alumns);
      if (!valid || cont1 < 2 || cont2 === 0) res = false;
    }

    return res;
  };

  const closeAlert = () => {
    if(utils.alert.lvl === "error"){
      utils.setAlert({ lvl: null, msg: null });
      location.reload()
    }else{
      utils.setAlert({ lvl: null, msg: null });
      location.replace("/booth")
    }
  };
  
  const Modals = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const showModal = () => {
      setIsOpen(true);
    };
  
    const hideModal = () => {
      setIsOpen(false);
    };
  
    return (
      <div>
        
<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Bases de la votación
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Bases de la votación</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ¡Bienvenido al portal de votaciones de decide!
        Para registrar tu voto, solo tienes que pulsar en una de las cartas,
        y esta se girará para que puedas verla. Solo puedes elegir uno por votación
        hasta un total de 10 candidatos. Recuerda que puedes votar a un máximo de
        5 hombres y 5 mujeres. 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Entendido, vamos allá</button>
      </div>
    </div>
  </div>
</div>
      </div>
    );
  };


  const sendVoting = async (event) => {
    event.preventDefault();

    const options = await getInput();

    if (options) {

      const v = encryptAll(options);
      setSendVotingAnimation(true);
      setTimeout(() => {
        setSendVotingAnimation(false);
      }, 3000);

      const data = {
        vote: v,
        voting: voting.id,
        voter: utils.votingUserData.user_id,
        token: utils.votingUserData.token,
      };
      utils
        .post("/gateway/store/", data)
        .then((data) => {
          setTimeout(() => {
            utils.setAlert({
              lvl: "success",
              msg: "Conglatulations! Your vote has been sent",
            });
           }, 1700);
           
        })
        .catch((error) => {
          utils.setAlert({ lvl: "error", msg: "Error: " + error });
        });
        $("div.active-question").removeClass("active-question");
        voted = true;
        console.log("voted on send vote: "+voted);

    } else {
      utils.setAlert({
        lvl: "error",
        msg:
          "No se puede votar en blanco.\nSólo se pueden seleccionar 10 alumnos en la lista como máximo, y 5 hombres y mujeres respectivamente.",
      });
      $("div.active-question").removeClass("active-question");
    }
  };

  const filterQuestions = () => {
    let res = []
    let year = dictionary[utils.votingUserData.year]
    year = year - 1
    const q1 = voting.question[year]
    const q2 = voting.question[5]
    res.push(q1)
    res.push(q2)
    console.log(votingType)
    if (votingType === "general") {
      const q3 = voting.question[6]
      res.push(q3)
    }
    voting.question = res
    console.log(voting.question)
    return res
  }

  /*#####################################################*/
  /*####################### STATE #######################*/
  /*#####################################################*/
  const[sendVotingAnimation, setSendVotingAnimation] = useState(false);
  /*############### FUNCTIONALITY ###############*/
  if (firstRender){
    votingType = getVotingType();
    filterQuestions()
    if (votingType === "general") {
      alumList = voting.question[2];
    }
  }

  useEffect(() =>{
    firstRender = false
  },[])
  

  // COSAS DEL ESTILO
  function updateButtons(question_to_update) {
    // Si existe una pregunta posterior
    if (question_to_update.next().hasClass("question")) {
      $("button#next-question").css({
        "display": "block",
      });
    }else{
      $("button#next-question").css({
        "display": "none",
      });
    }
    if (question_to_update.prev().hasClass("question")) {
      $("button#prev-question").css({
        "display": "block",
      });
    }else{
      $("button#prev-question").css({
        "display": "none",
      });
    }
  };

  //   show the first element, the others are hide by default
  $(document).ready(function () {
    // $(".App").addClass("container-fluid");
    if(voted = "false"){
      console.log("voted false: "+ voted);

      $("div.question:first-of-type").addClass("active-question");
    }else{
      console.log("voted : "+ voted);

    }
    $("button#prev-question").css({
      "display": "none",
    });
    // $("#next-question").click(function () {
    
    console.log("doc ready");
    if ($("#prev-question").length) {
      console.log("Element exists");
    } else {
      console.log("Element doesnt exists");
    }
    var colors = new Array(
      "#EF476F",
      "#F78C6B",
      "#FFD166",
      "#83D483",
      "#06D6A0",
      "#118AB2",
      "#073B4C"
    );
    // new colors = ["#EF476F","#FFD166","#06D6A0","#118AB2","#073B4C"];

    $(".question").each(function (index) {
      // console.log(index + ": " + $(this).text());
      // console.log(index + ": " + colors[index]);
      $(this).css({
        "background-color": colors[index],
        filter: "brightness(95%)",
      });
      $(this).find(".flip-card-back").css({
        "background-color": colors[index],
      });
      // console.log(index + ": " + $(this).text());
    });

    $("button#next-question").click(function () {
      console.log("next");

      var active_question = $("div.active-question");
      updateButtons(active_question.next());

      if (active_question.next().hasClass("question")) {
        active_question.next().addClass("active-question");
        active_question.removeClass("active-question");
      }
    });
    $("button#prev-question").click(function () {
      console.log("prev");

      var active_question = $("div.active-question");
      updateButtons(active_question.prev());

      if (active_question.prev().hasClass("question")) {
        active_question.prev().addClass("active-question");
        active_question.removeClass("active-question");
      }
    });

    // $( "option" ).each( function(option) {
    //   console.log('do something with this list item', option);
    // })
    $("input").on("click", function () {
      //flip-card, flip-card-inner, flip-card-front, input
      if ($(this).parent().parent().parent().hasClass("flipped")) {
        console.log($("input:checked").val() + " is checked!");

        $(".flip-card.flipped").removeClass("flipped");
      } else {
        console.log($("input:checked").val() + " is checked!");

        $(".flip-card.flipped").removeClass("flipped");
        $("input:checked").parent().parent().parent().addClass("flipped");
      }
      // console.log($("input:checked").val() + " is checked!");
      // $("#log").html;
    });
  });
  // BUTTONS NOT WORKING

  // For the flip effect, not working
  // $(".flip-card").click(function () {
  //   console.log("clicked");
  //   $(".flip-card.flipped").removeClass("flipped");
  //   $(this).addClass("flipped");
  // });

  // $(".flip-card.flipped").click(function () {
  //   $(this).removeClass("flipped");
  // });

  // $(function () {
  //   $(window).on("wheel", function (e) {
  //     var delta = e.originalEvent.deltaY;

  //     if (delta > 0) {
  //       var active_question = $("div.active-question");

  //       if (active_question.next().hasClass("question")) {
  //         active_question.next().addClass("active-question");
  //         active_question.removeClass("active-question");
  //       }
  //       console.log("scrolled downs");
  //       // $("html, body").animate(
  //       //   {
  //       //     // scrollTop: $("#candidatura2").offset().top,
  //       //     scrollTop: $(window).scrollTop() + window.innerHeight,
  //       //   },
  //       //   1000
  //       // );
  //     } else {
  //       // $("div.active-question").prev().addClass("active-question");
  //       // $("div.active-question").removeClass("active-question");
  //       var active_question = $("div.active-question");
  //       if (active_question.prev().hasClass("question")) {
  //         active_question.prev().addClass("active-question");
  //         active_question.removeClass("active-question");
  //       }
  //       console.log("scrolled up");

  //       // upscroll code
  //       // $("html, body").animate(
  //       //   {
  //       //     // scrollTop: $("#candidatura1").offset().top,
  //       //     scrollTop: $(window).scrollTop() - window.innerHeight,
  //       //   },
  //       //   1000
  //       // );
  //     }
  //     return false; // this line is only added so the whole page won't scroll in the demo
  //   });
  // });

  /*############### RETURN ###############*/
  return (
    <div id="voting-body" className="voting container-fluid">
      {/* <div>
        <button id="prev-question">Prev Question </button>
        <button id="next-question">Next Question </button>
      </div> */}
      <div className="row justify-content-between align-items-center">
        <div className="col-4">
          <button
            id="prev-question"
            type="button"
            className="btn btn-outline-dark"
          >
            Prev
          </button>{" "}
        </div>
        {<div className="col-4">
        
        {<Modals/>}
    </div>}
        <div className="col-4">
          {" "}
          <button
            id="next-question"
            type="button"
            className="btn btn-outline-dark"
          >
            Next
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <form onSubmit={sendVoting}>
            {/* The 6 questions all votings have */}
            {voting.question.slice(0, 2).map((o) => (

              <div className="question" key={o.desc}>
                <div align="center">
                  {" "}
                <h2>{o.desc}</h2>
                 </div>
                <div className="container-fluid">

                  <div className="d-flex align-content-center flex-wrap ">
                  {sendVotingAnimation &&
                <div className="votingAnimation">
                <a id="rotator"><img src="https://image.flaticon.com/icons/png/512/91/91848.png"/></a>
                </div>
                }

                    {o.options.map((p) => (
                      <div key={p.number}>
                        <div className="option p-3">
                          <div className="card-input">
                            <label>
                              
                              <div className="flip-card">
                                <div className="flip-card-inner">
                                  <div className="flip-card-front">
                                    <input
                                      type="radio"
                                      name={o.desc}
                                      className="card-input-element"
                                      value={p.number}
                                      
                                    />
                                    <h1>Candidato:</h1>
                                    <h1>{p.option}</h1>
                                  </div>

                                  <div className="flip-card-back">
                                    <h1>Candidato 1</h1>
                                    <p>Algo del candidato</p>
                                    <p>{o.option}</p>
                                    <p>Has elegido el candidato:</p>
                                  </div>
                                </div>
                              </div>
                            </label>
                            <br />
                          </div>
                        </div>
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
                
              </div>
            ))}
            {/* The alumn list */}
            {votingType === "general" && (
              <div className="alum-list question" align="center">
                <div>
                  <h2>{alumList.desc}</h2>
                </div>
                <div className="container-fluid">
                  <div className="d-flex align-content-center flex-wrap ">
                    {alumList.options.map((p) => (
                      <div key={p.number} className="p-3">
                        {p.option.split("/")[0]}
                        <label className="checkbox">
                        <input
                          type="checkbox"
                          name={alumList.desc}
                          value={parseInt(
                            p.option.split("/")[1].replace(" ", "")
                          )}
                          
                        />
                      <span className="default"></span>

                        </label>
                       
                        
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* <div className="row">
              <div className="col"> */}
              
            <div>
              <button id="voteButton" className="btn btn-outline-dark ">
                Vote
              </button>
            </div>
            {/* </div> */}
            {/* </div> */}
          </form>
          {utils.alert.lvl ? (
            <div className={"alert " + utils.alert.lvl}>
              <p>{utils.alert.msg}</p>
              <button className=" btn btn-outline-dark " onClick={closeAlert}>
                {
                  utils.alert.lvl === "error"
                  ? 'Empezar de nuevo'
                  : 'Volver a inicio'
                }
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Voting;