"use strict";
const { useState } = React;

const Voting = ({ utils }) => {
  /*############### STATE ###############*/

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  /*############### UTILITY FUNCTIONS ###############*/
  const bigpk = {
    p: BigInt.fromJSONObject(voting.pub_key.p.toString()),
    g: BigInt.fromJSONObject(voting.pub_key.g.toString()),
    y: BigInt.fromJSONObject(voting.pub_key.y.toString()),
  };

  const encrypt = () => {
    const bigmsg = BigInt.fromJSONObject(selectedAnswer);
    const cipher = ElGamal.encrypt(bigpk, bigmsg);
    return cipher;
  };
  console.log(selectedAnswer);
  const sendVoting = (event) => {
    event.preventDefault();

    if (selectedAnswer == null) {
      utils.setAlert({ lvl: "error", msg: "Please select an option" });
    } else {
      const v = encrypt();
      const data = {
        vote: { a: v.alpha.toString(), b: v.beta.toString() },
        voting: voting.id,
        voter: utils.user.id,
        token: utils.token,
      };
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
    }
  };

  /*############### FUNCTIONALITY ###############*/
  // For the flip effect
  $(".flip-card").click(function () {
    $(".flip-card.flipped").removeClass("flipped");
    $(this).addClass("flipped");
  });

  $(".flip-card.flipped").click(function () {
    $(this).removeClass("flipped");
  });

  // For the smooth scroll effect

  // $(window).scroll(function () {
  //   $("#candidatura1").fadeOut(); // replace only #btop with your <div id=" ">

  //   // if ($(this).scrollTop() > 100) {
  //   //   $("#candidatura2").fadeIn(); // replace only #btop with your <div id=" ">
  //   // } else {
  //   //   $("#candidatura2").fadeOut(); // replace only #btop with your <div id=" ">
  //   // }
  // });

  // $("#candidatura1").scroll(){
  //   console.log("Scroll detected")
  // };
  // $(window).scroll(function () {
  //   // $( "span" ).css( "display", "inline" ).fadeOut( "slow" );

  //   console.log("Scrolled" + ($(window).scrollTop() + window.innerHeight));
  //   // alert("La barra vertical se ha movido " + $(window).scrollTop() + " pixels");
  //   // $(window).scrollTop()+window.innerHeight;
  //   $("html, body").animate(
  //     {
  //       // scrollTop: $("#candidatura2").offset().top
  //       scrollTop: $(window).scrollTop() + window.innerHeight,
  //     },
  //     2000
  //   );
  // });

  // var lastScrollTop = 0;
  // $(window).scroll(function () {
  //   // console.log("Scrolled" + ($(window).scrollTop() + window.innerHeight));

  //   var umbral = 50;
  //   var st = $(this).scrollTop();

  //   console.log("lastScrollTop" + lastScrollTop);
  //   console.log("st" + st);

  //   // if (Math.abs(st - lastScrollTop) > umbral) {
  //     if (st > lastScrollTop) {
  //       $("html, body").animate(
  //         {
  //           scrollTop: $("#candidatura2").offset().top
  //           // scrollTop: $(window).scrollTop() + window.innerHeight,
  //         },
  //         2000
  //       );
  //     } else {
  //       // upscroll code
  //       $("html, body").animate(
  //         {
  //           scrollTop: $("#candidatura1").offset().top
  //           // scrollTop: $(window).scrollTop() - window.innerHeight,
  //         },
  //         2000
  //       );
  //     }
  //   // }
  //   lastScrollTop = st;

  // });

  $(function () {
    $(window).on("wheel", function (e) {
      var delta = e.originalEvent.deltaY;

      if (delta > 0) {
        $("html, body").animate(
          {
            // scrollTop: $("#candidatura2").offset().top,
            scrollTop: $(window).scrollTop() + window.innerHeight,
          },
          1000
        );
      } else {
        // upscroll code
        $("html, body").animate(
          {
            // scrollTop: $("#candidatura1").offset().top,
            scrollTop: $(window).scrollTop() - window.innerHeight,
          },
          1000
        );
      }
      return false; // this line is only added so the whole page won't scroll in the demo
    });
  });

  /*############### RETURN ###############*/
  return (
    <div className="voting">
      <h2>{voting.question.desc}</h2>
      {/* CANDIDATURA 1 */}
      <div className="candidatura" id="candidatura1">
        <h2>CANDIDATURA 1</h2>
        <form onSubmit={sendVoting}>
          <div className="option">
            {voting.question.options.map((o) => (
              <div className="card-input" key={o.number}>
                <label>
                  <input
                    type="radio"
                    name="product"
                    className="card-input-element"
                    onChange={(e) => setSelectedAnswer(o.number)}
                    checked={selectedAnswer === o.number}
                  />
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <h1>Candidato: {o.option}</h1>
                        {/* <img
                          src="img_avatar.png"
                          alt="Avatar"
                          style="width:300px;height:300px;"
                        >
                        </img> */}
                      </div>
                      <div className="flip-card-back">
                        <h1>Candidato 1</h1>
                        <p>Algo del candidato</p>
                        <p>{o.option}</p>
                        <p>Has elegido el candidato: {selectedAnswer}</p>
                      </div>
                    </div>
                  </div>
                </label>
                <br />
              </div>
            ))}
          </div>
          <button>Vote</button>
        </form>
      </div>
      {/* CANDIDATURA 2 */}

      <div className="candidatura" id="candidatura2">
        <h2>CANDIDATURA 2</h2>
        <form onSubmit={sendVoting}>
          <div className="option">
            {voting.question.options.map((o) => (
              <div className="card-input" key={o.number}>
                <label>
                  <input
                    type="radio"
                    name="product"
                    className="card-input-element"
                    onChange={(e) => setSelectedAnswer(o.number)}
                    checked={selectedAnswer === o.number}
                  />
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <h1>Candidato: {o.option}</h1>
                        {/* <img
                          src="img_avatar.png"
                          alt="Avatar"
                          style="width:300px;height:300px;"
                        >
                        </img> */}
                      </div>
                      <div className="flip-card-back">
                        <h1>Candidato 1</h1>
                        <p>Algo del candidato</p>
                        <p>{o.option}</p>
                        <p>Has elegido el candidato: {selectedAnswer}</p>
                      </div>
                    </div>
                  </div>
                </label>
                <br />
              </div>
            ))}
          </div>
          <button>Vote</button>
        </form>
      </div>
      {/* CANDIDATURA 3 */}

      {/* <div className="" id="candidatura3">
      <h2>CANDIDATURA 3</h2>

        <form onSubmit={sendVoting}>
          <div className="row">
            {voting.question.options.map((o) => (
              <div key={o.number}>
                <label>
                  <input
                    type="radio"
                    name="product"
                    className="card-input-element"
                    onChange={(e) => setSelectedAnswer(o.number)}
                    checked={selectedAnswer === o.number}
                  />
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <h1>Candidato: {o.option}</h1>
                        
                      </div>
                      <div className="flip-card-back">
                        <h1>Candidato 1</h1>
                        <p>Algo del candidato</p>
                        <p>{o.option}</p>
                        <p>Has elegido el candidato: {selectedAnswer}</p>
                      </div>
                    </div>
                  </div>
                </label>
                <br />
              </div>
            ))}
          </div>
          <button>Vote</button>
        </form>
      </div> */}
    </div>
  );
};
export default Voting;
