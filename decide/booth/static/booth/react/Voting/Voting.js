'use strict';
const { useState } = React

const Voting = ({ utils }) => {

    /*############### STATE ###############*/

    const [selectedAnswer, setSelectedAnswer] = useState(null);


    /*############### UTILITY FUNCTIONS ###############*/
    const bigpk = {
        p: BigInt.fromJSONObject(voting.pub_key.p.toString()),
        g: BigInt.fromJSONObject(voting.pub_key.g.toString()),
        y: BigInt.fromJSONObject(voting.pub_key.y.toString()),
    }

    const encrypt = () => {
        const bigmsg = BigInt.fromJSONObject(selectedAnswer);
        const cipher = ElGamal.encrypt(bigpk, bigmsg);
        return cipher;
    }
    console.log(selectedAnswer)
    const sendVoting = (event) => {
        event.preventDefault();

        if (selectedAnswer == null) {
            utils.setAlert({lvl:'error', msg:'Please select an option'})
        }
        else {
            const v = encrypt();
            const data = {
                vote: { a: v.alpha.toString(), b: v.beta.toString() },
                voting: voting.id,
                voter: utils.user.id,
                token: utils.token
            }
            utils.post("/gateway/store/", data)
                .then(data => {
                    utils.setAlert({ lvl: 'success', msg: 'Conglatulations. Your vote has been sent' });
                })
                .catch(error => {
                    utils.setAlert({ lvl: 'danger', msg: 'Error: ' + error, });
                });
        }
    }

    /*############### FUNCTIONALITY ###############*/


    /*############### RETURN ###############*/
    return (
        <div className="voting">
            <h2>{voting.question.desc}</h2>

            <form onSubmit={votingPopup}>

                {voting.question.options.map(o => (
                    <div key={o.number}>
                        <input type="radio" onChange={e => setSelectedAnswer(o.number)} checked={selectedAnswer === o.number} />
                        {o.option}
                        <br />
                    </div>
                ))}

                <button>Tu madre</button>
            </form>

        </div >
    );
}
function votingPopup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure of your selection?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={sendVoting}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Voting;
