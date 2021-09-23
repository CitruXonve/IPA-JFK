import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import * as classes from './scss/app.scss';

const App = () => {
  return (  
    <div className="App">
      <Main />
    </div>
  )
}

document.body.className = classes.body;
ReactDOM.render(<App />, document.getElementById('root'));

// hot reloading. It works by replacing a module of the application 
// during runtime with an updated one so that it’s available for instant use.
// module.hot.accept();