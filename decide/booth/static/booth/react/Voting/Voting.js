'use strict';
const { useState } = React

const Voting = ({ utils }) => {

    /*#################################################################*/
    /*####################### UTILITY FUNCTIONS #######################*/
    /*#################################################################*/

    const getVotingType = () => {
        let res = "";
        if (voting.name.toLowerCase().includes('primaria') && voting.question.length == 6)
            res = "primary";
        else if (voting.name.toLowerCase().includes('general') && voting.question.length == 7)
            res = "general";
        else {
            res = "error"
            console.log("error");//setAlert()
        }

        return res;
    }

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


    const getGenresByIds = async (ids) => {
        let res = null;

        await utils.post("/authentication/decide/getGenresByIds/", ids)
            .then(result => {
                res = result;
            })
            .catch(error => {
                console.log(error)//this.showAlert("danger", '{% trans "Error: " %}' + error);
            });

        return res.genres;
    }

    const checkRestrictions = async (ids) => {
        let res = true;

        let genres = await getGenresByIds(ids);
        let males = 0; let females = 0; let others = 0;

        for (let i = 0; i < genres.length; i++) {
            if (genres[i] === 'Man')
                males = males + 1;
            else if (genres[i] === 'Woman')
                females = females + 1;
            else
                others = others + 1;
        }

        if ((males > 5) || (females > 5) || (males + females + others > 10))
            res = false;

        return res;
    }

    const getInput = async () => {
        let res = {}

        let questions = document.getElementsByClassName('question')
        for (let i = 0; i < questions.length; i++) {
            const titulo = questions[i].children[0].innerHTML;
            let inputs = questions[i].getElementsByTagName('input')
            for (let j = 0; j < inputs.length; j++) {
                if (inputs[j].checked) {
                    res[titulo] = inputs[j].value
                }
            }
        }
        res['sex'] = utils.votingUserData.sex
        res['age'] = utils.votingUserData.age
        res['grade'] = utils.votingUserData.grade
        res['year'] = utils.votingUserData.year

        if (votingType === 'general') {
            let la = document.getElementsByClassName('alum-list');
            let alumns = [];
            let inputs = la[0].getElementsByTagName('input')

            for (let j = 0; j < inputs.length; j++) {
                if (inputs[j].checked)
                    alumns.push(inputs[j].value)
            }
            res[la[0].children[0].innerHTML] = alumns

            const valid = await checkRestrictions(alumns)
            if (!valid)
                res = false;
        }

        return res
    }

    const sendVoting = async (event) => {
        event.preventDefault();

        const options = await getInput()

        if (options) {
            const v = encrypt(options);
            const data = {
                vote: { a: v.alpha.toString(), b: v.beta.toString() },
                voting: voting.id,
                voter: utils.votingUserData.user_id,
                token: utils.votingUserData.token,
            }
            utils.post("/gateway/store/", data)
                .then(data => {
                    utils.setAlert({ lvl: 'success', msg: 'Conglatulations. Your vote has been sent' });
                })
                .catch(error => {
                    utils.setAlert({ lvl: 'error', msg: 'Error: ' + error, });
                });
        }
        else {
            utils.setAlert({ lvl: 'error', msg: 'Solo se pueden seleccionar 10 alumnos en la lista como máximo, y 5 hombres y mujeres respectivamente', });
        }
    }




    /*#####################################################*/
    /*####################### STATE #######################*/
    /*#####################################################*/

    /*#############################################################*/
    /*####################### FUNCTIONALITY #######################*/
    /*#############################################################*/
    const votingType = getVotingType();

    let alumList = null;
    if (votingType === 'general') {
        alumList = voting.question[6];
    }



    /*####################################################*/
    /*####################### VIEW #######################*/
    /*####################################################*/

    return (
        <div className="voting">

            <form onSubmit={sendVoting}>

                {/* The 6 questions all votings have */}
                {voting.question.slice(0, 6).map(o => (
                    <div className='question' key={o.desc}>
                        <h2>{o.desc}</h2>
                        {o.options.map(p => (
                            <div key={p.number}>
                                <input type="radio" name={o.desc} value={p.number} />
                                {p.option}
                                <br />
                            </div>
                        ))}
                    </div>
                ))}

                {/* The alumn list */}
                {votingType === 'general' &&

                    <div className="alum-list">
                        <h2>{alumList.desc}</h2>

                        {alumList.options.map(p => (
                            <div key={p.number}>
                                <input type="checkbox" name={'o.desc'} value={parseInt(p.option.split('/')[1].replace(' ', ''))} />{p.option.split('/')[0]}
                            </div>
                        ))}
                    </div>
                }

                <button>Vote</button>
            </form>

        </div >
    );
}
export default Voting;