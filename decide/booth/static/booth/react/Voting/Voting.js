"use strict";
const { useState } = React;

const Voting = ({ utils, value }) => {
  /*############### STATE ###############*/

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  /*############### UTILITY FUNCTIONS ###############*/
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

  const sendVoting = (event) => {
    event.preventDefault();

    const options = getInput();

    const v = encrypt(options);
    const data = {
      vote: { a: v.alpha.toString(), b: v.beta.toString() },
      voting: voting.id,
      voter: value.user_id,
      token: value.token,
    };
    console.log(data);
    utils
      .post("/gateway/store/", data)
      .then((data) => {
        utils.setAlert({
          lvl: "success",
          msg: "Conglatulations. Your vote has been sent",
        });
      })
      .catch((error) => {
        utils.setAlert({ lvl: "danger", msg: "Error: " + error });
      });
  };

  const getInput = (event) => {
    let res = {};
    let a = document.getElementsByClassName("question");
    for (let i = 0; i < a.length; i++) {
      const titulo = a[i].children[0].innerHTML;
      let inputs = a[i].getElementsByTagName("input");
      for (let j = 0; j < inputs.length; j++) {
        if (inputs[j].checked) {
          res[titulo] = inputs[j].value;
        }
      }
    }
    res["sex"] = value.sex;
    res["age"] = value.age;
    res["grade"] = value.grade;
    res["year"] = value.year;
    console.log(res);
    return res;
  };

  /*############### FUNCTIONALITY ###############*/
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
      <div class="row align-items-center">
        <div class="col-4">
          <button
            id="prev-question"
            type="button"
            class="btn btn-outline-light"
          >
            Prev
          </button>{" "}
        </div>

        <div class="col-4">
          {" "}
          <button
            id="next-question"
            type="button"
            class="btn btn-outline-light"
          >
            Next
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <form onSubmit={sendVoting}>
            {voting.question.map((o) => (
              <div className="question ">
                <h2>{o.desc}</h2>
                <div class="d-flex align-content-center flex-wrap ">
                  {o.options.map((p) => (
                    <div>
                      <div className="option p-3">
                        <div className="card-input" key={o.number}>
                          <label>
                            {/* <input
                        type="radio"
                        name="product"
                        className="card-input-element"
                        onChange={(e) => setSelectedAnswer(o.number)}
                        checked={selectedAnswer === o.number}
                      /> */}
                            <input
                              type="radio"
                              name={o.desc}
                              className="card-input-element"
                              value={p.number}
                              required
                            />
                            {p.option}
                            <div className="flip-card">
                              <div className="flip-card-inner">
                                <div className="flip-card-front">
                                  <h1>Candidato: {p.option}</h1>
                                </div>
                                <div className="flip-card-back">
                                  <h1>Candidato 1</h1>
                                  <p>Algo del candidato</p>
                                  <p>{o.option}</p>
                                  <p>
                                    Has elegido el candidato: {selectedAnswer}
                                  </p>
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
            ))}
            {/* <div class="row">
              <div class="col"> */}
            <div>
              <button class="btn btn-outline-light ">Vote</button>
            </div>
            {/* </div> */}
            {/* </div> */}
          </form>
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
