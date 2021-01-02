'use strict';
const { useState } = React

const Voting = ({ utils, value }) => {

    /*############### STATE ###############*/

    const [selectedAnswer, setSelectedAnswer] = useState(null);


    /*############### UTILITY FUNCTIONS ###############*/
    const bigpk = {
        p: BigInt.fromJSONObject(voting.pub_key.p.toString()),
        g: BigInt.fromJSONObject(voting.pub_key.g.toString()),
        y: BigInt.fromJSONObject(voting.pub_key.y.toString()),
    }

    const encrypt = (options) => {
        const bigmsg = BigInt.fromJSONObject(options.toString());
        const cipher = ElGamal.encrypt(bigpk, bigmsg);
        return cipher;
    }
    
    const sendVoting = (event) => {
        event.preventDefault();

        const options = getInput()

        const v = encrypt(options);
        const data = {
            vote: { a: v.alpha.toString(), b: v.beta.toString() },
            voting: voting.id,
            voter: value.user_id,
            token: value.token,
            sex: value.sex,
            age: value.age,
            grade: value.grade,
            year: value.year,
        }
        console.log(data)
        utils.post("/gateway/store/", data)
            .then(data => {
                utils.setAlert({ lvl: 'success', msg: 'Conglatulations. Your vote has been sent' });
            })
            .catch(error => {
                utils.setAlert({ lvl: 'danger', msg: 'Error: ' + error, });
            });
    }

    const getInput = (event) => {
        let res = {}
        let a = document.getElementsByClassName('question')
        for (let i = 0; i < a.length; i++) {
            const titulo = a[i].children[0].innerHTML;
            let inputs = a[i].getElementsByTagName('input')
            for (let j = 0; j < inputs.length; j++) {
                if (inputs[j].checked) {
                    res[titulo] = inputs[j].value
                }
            }
        }
        return res
    }

    /*############### FUNCTIONALITY ###############*/


    /*############### RETURN ###############*/
    return (
        <div className="voting">

            <form onSubmit={sendVoting}>
                {voting.question.map(o => (
                    <div className='question'>
                        <h2>{o.desc}</h2>
                        {o.options.map(p => (
                            <div>
                                <input type="radio" name={o.desc} value={p.number} required />
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
                    ))}*/