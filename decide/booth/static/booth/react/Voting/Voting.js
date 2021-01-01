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
            
            <form onSubmit={sendVoting}>
                {voting.question.map(o => (
                    <div>
                        <h2>{o.desc}</h2>
                        {o.options.map(p => (
                        <div key={p.number}>
                            <input type="radio" onChange={e => setSelectedAnswer(p.number)} checked={selectedAnswer === p.number} />
                            {p.option}
                            <br />
                        </div>
                    ))}
                    </div>
                ))}
                <button>Vote</button>
            </form>

        </div >
    );
}
export default Voting;

/* <h2>{voting.question.desc}</h2>

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
                    ))}*/