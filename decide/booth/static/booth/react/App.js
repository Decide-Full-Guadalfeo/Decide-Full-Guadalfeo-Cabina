'use strict';

import Test from "./Test";
import Test2 from "./Test2";
const {useState} = React;

const App = () => {
  
const [t1, setT1] = useState(true)

  return (
    <div className="App">
        <p>This is the root</p>
        <button type="button" className="btn btn-primary" onClick={() => setT1(!t1)}>
            SwitchTest
        </button>
        {t1 ? <Test/> : <Test2/>}
    </div>
  );

}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(<App/>, domContainer);