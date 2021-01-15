'use strict';
const {useState} = React

const Test2 = () => {
  
  const [liked, setLiked] = useState(false)
  
  const Msg = () => (
    <p>You didnt liked it</p>
  );
  
  const Btn = () => (
    <button onClick={() => setLiked(!liked)}>
        Dont Like
    </button>
  );

  return (
    <div>
      <br/>
      <Btn/>
      {liked ? <Msg/> : null}
    </div>
  );

}
export default Test2;