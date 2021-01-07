"use strict";
const { useState } = React;

const Voting = ({ utils }) => {
  /*#################################################################*/
  /*####################### UTILITY FUNCTIONS #######################*/
  /*#################################################################*/

  const getVotingType = () => {
    let res = "";
    if (voting.tipo === "PV" && voting.question.length == 6) res = "primary";
    else if (voting.tipo === "GV" && voting.question.length == 7)
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
    const bigmsg = BigInt.fromJSONObject(options.toString());
    const cipher = ElGamal.encrypt(bigpk, bigmsg);
    return cipher;
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
    for (let i = 0; i < questions.length; i++) {
      const titulo = questions[i].children[0].innerHTML;
      let inputs = questions[i].getElementsByTagName("input");
      for (let j = 0; j < inputs.length; j++) {
        if (inputs[j].checked) {
          res[titulo] = inputs[j].value;
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

      for (let j = 0; j < inputs.length; j++) {
        if (inputs[j].checked) alumns.push(inputs[j].value);
      }
      res[la[0].children[0].innerHTML] = alumns;

      const valid = await checkRestrictions(alumns);
      if (!valid) res = false;
    }

    return res;
  };

  const closeAlert = () => {
    utils.setAlert({ lvl: null, msg: null });
  };

  const sendVoting = async (event) => {
    event.preventDefault();

    const options = await getInput();

    if (options) {
      const v = encrypt(options);
      setSendVotingAnimation(true);
      setTimeout(() => {
        setSendVotingAnimation(false);
      }, 3000);
      const data = {
        vote: { a: v.alpha.toString(), b: v.beta.toString() },
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
    } else {
      utils.setAlert({
        lvl: "error",
        msg:
          "Solo se pueden seleccionar 10 alumnos en la lista como máximo, y 5 hombres y mujeres respectivamente",
      });
    }
  };

  /*#####################################################*/
  /*####################### STATE #######################*/
  /*#####################################################*/
  const[sendVotingAnimation, setSendVotingAnimation] = useState(false);
  /*############### FUNCTIONALITY ###############*/
  const votingType = getVotingType();

  let alumList = null;
  if (votingType === "general") {
    alumList = voting.question[6];
  }

  // COSAS DEL ESTILO

  //   show the first element, the others are hide by default
  $(document).ready(function () {
    // $(".App").addClass("container-fluid");

    $("div.question:first-of-type").addClass("active-question");
    // $("#next-question").click(function () {

    console.log("doc ready");
    if ($("#prev-question").length) {
      console.log("Element exists");
    } else {
      console.log("Element doesnt exists");
    }
    var colors = new Array(
      "#EF476F",
      "#FFD166",
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
      // console.log(index + ": " + $(this).text());
    });

    $("#next-question").click(function () {
      console.log("next");

      var active_question = $("div.active-question");
      if (active_question.next().hasClass("question")) {
        active_question.next().addClass("active-question");
        active_question.removeClass("active-question");
      }
    });
    $("button#prev-question").click(function () {
      console.log("prev");

      var active_question = $("div.active-question");
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
      if ($("input:checked").parent().parent().parent().hasClass("flipped")) {
        $(".flip-card.flipped").removeClass("flipped");
      } else {
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
            className="btn btn-outline-light"
          >
            Prev
          </button>{" "}
        </div>

        <div className="col-4">
          {" "}
          <button
            id="next-question"
            type="button"
            className="btn btn-outline-light"
          >
            Next
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <form onSubmit={sendVoting}>
            {/* The 6 questions all votings have */}
            {voting.question.slice(0, 6).map((o) => (
              <div className="question" key={o.desc}>
                
                <h2>{o.desc}</h2>
                
                <div className="container">

                  <div class="d-flex align-content-center flex-wrap ">
                  {sendVotingAnimation &&
                <div className="votingAnimation">
                <a id="rotator"><img src="https://image.flaticon.com/icons/png/512/91/91848.png"/></a>
                </div>
                }
                    {o.options.map((p) => (
                      <div>
                        <div className="option p-3">
                          <div className="card-input" key={p.number}>
                            <label>
                              {/* <input
                        type="radio"
                        name="product"
                        className="card-input-element"
                        onChange={(e) => setSelectedAnswer(o.number)}
                        checked={selectedAnswer === o.number}
                      /> */}
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
              <div className="alum-list question">
                <h2>{alumList.desc}</h2>

                {alumList.options.map((p) => (
                  <div key={p.number}>
                    <input
                      type="checkbox"
                      name={"o.desc"}
                      value={parseInt(p.option.split("/")[1].replace(" ", ""))}
                    />
                    {p.option.split("/")[0]}
                  </div>
                ))}
              </div>
            )}
            {/* <div class="row">
              <div class="col"> */}
            <div>
              <button id="voteButton" className="btn btn-outline-light ">
                Vote
              </button>
            </div>
            {/* </div> */}
            {/* </div> */}
          </form>
          {utils.alert.lvl ? (
            <div className={"alert " + utils.alert.lvl}>
              <p>{utils.alert.msg}</p>
              <button className="closeAlert" onClick={closeAlert}>
                close
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Voting;

{
  /* onChange={e => setObjeto(...objeto,{[o.desc]:p.number})}
<h2>{voting.question.desc}</h2>
            <form onSubmit={sendVoting}>
                {voting.question.options.map(o => (
                    <div key={o.number}>
                        <input type="radio" onChange={e => setSelectedAnswer(o.number)} checked={selectedAnswer === o.number} />
                        {o.option}
                        <br />
                    </div>
                ))}
                <button>Vote</button>
            </form>
            {o.options.map(p => (
                        <div key={p.number}>
                            <input type="radio" onChange={e => setSelectedAnswer(p.number)} checked={selectedAnswer === p.number} />
                            {p.option}
                            <br />
                        </div>
                    ))} */
}
{
  /* <img
                          src="img_avatar.png"
                          alt="Avatar"
                          style="width:300px;height:300px;"
                        >
                        </img> */
}
