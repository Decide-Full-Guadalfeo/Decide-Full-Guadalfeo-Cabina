'use strict';
const {useState} = React

const Test = () => {
  
  const [liked, setLiked] = useState(false)
  
  const Msg = () => (
    <p>You liked it</p>
  );
  
  const Btn = () => (
    <button onClick={() => setLiked(true)}>
        Like
    </button>
  );

  return (
    <div>
      <br/>
      {liked ? <Msg/> : <Btn/>}
    </div>
  );

}
export default Test;