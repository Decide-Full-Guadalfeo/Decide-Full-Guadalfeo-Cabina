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

  $(".flip-card").click(function () {
    $(".flip-card.flipped").removeClass("flipped");
    $(this).addClass("flipped");
  });

  $(".flip-card.flipped").click(function () {
    $(this).removeClass("flipped");
  });

  /*############### RETURN ###############*/
  return (
    <div className="voting">
      <h2>{voting.question.desc}</h2>
      {/* CANDIDATURA 1 */}
      <div class="" id="candidatura1">
      <h2>CANDIDATURA 1</h2>
        <form onSubmit={sendVoting}>
          <div class="row">
            {voting.question.options.map((o) => (
              <div key={o.number}>
                <label>
                  <input
                    type="radio"
                    name="product"
                    class="card-input-element"
                    onChange={(e) => setSelectedAnswer(o.number)}
                    checked={selectedAnswer === o.number}
                  />
                  <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <h1>Candidato: {o.option}</h1>
                        {/* <img
                          src="img_avatar.png"
                          alt="Avatar"
                          style="width:300px;height:300px;"
                        >
                        </img> */}
                      </div>
                      <div class="flip-card-back">
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

      <div class="" id="candidatura2">
      <h2>CANDIDATURA 2</h2>

        <form onSubmit={sendVoting}>
          <div class="row">
            {voting.question.options.map((o) => (
              <div  key={o.number}>
                <label>
                  <input
                    type="radio"
                    name="product"
                    class="card-input-element"
                    onChange={(e) => setSelectedAnswer(o.number)}
                    checked={selectedAnswer === o.number}
                  />
                  <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <h1>Candidato: {o.option}</h1>
                        {/* <img
                          src="img_avatar.png"
                          alt="Avatar"
                          style="width:300px;height:300px;"
                        >
                        </img> */}
                      </div>
                      <div class="flip-card-back">
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

      <div class="" id="candidatura3">
      <h2>CANDIDATURA 3</h2>

        <form onSubmit={sendVoting}>
          <div class="row">
            {voting.question.options.map((o) => (
              <div key={o.number}>
                <label>
                  <input
                    type="radio"
                    name="product"
                    class="card-input-element"
                    onChange={(e) => setSelectedAnswer(o.number)}
                    checked={selectedAnswer === o.number}
                  />
                  <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <h1>Candidato: {o.option}</h1>
                        {/* <img
                          src="img_avatar.png"
                          alt="Avatar"
                          style="width:300px;height:300px;"
                        >
                        </img> */}
                      </div>
                      <div class="flip-card-back">
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
    </div>
  );
};
export default Voting;
