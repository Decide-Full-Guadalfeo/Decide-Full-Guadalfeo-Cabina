'use strict';
const { useState } = React

const Voting = ({ post, user, token }) => {

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
    /*const showAlert = (lvl, msg) => {
        const alertLvl = lvl;
        this.alertMsg = msg;
        this.alertShow = true;
    }*/

    const sendVoting = (event) => {
        event.preventDefault();
        
        const v = encrypt();
        const data = {
            vote: { a: v.alpha.toString(), b: v.beta.toString() },
            voting: voting.id,
            voter: user.id,
            token: token
        }
        post("/gateway/store/", data)
            .then(data => {
                console.log('Ha funcao')//showAlert("success", '{% trans "Conglatulations. Your vote has been sent" %}');
            })
            .catch(error => {
                console.log('No funcao')//showAlert("danger", '{% trans "Error: " %}' + error);
            });
    }

    /*############### FUNCTIONALITY ###############*/


    /*############### RETURN ###############*/
    return (
        <div className="voting">
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

            <p>Question voted: {selectedAnswer}</p>
        </div >
    );
}
export default Voting;