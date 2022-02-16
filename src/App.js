import './App.css';
import Home from './components/taskManager.js'
import * as timeFunctions from './components/TimeContext';

import Pomodoro from './components/Pomodoro'

function App() {

  return (
    
    <timeFunctions.TimeProvider>
    <div className="App">
        <Pomodoro />
        <Home/>
    </div>
</timeFunctions.TimeProvider>
  );
}

export default App;