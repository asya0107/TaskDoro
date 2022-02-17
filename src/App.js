import './App.css';

import Home from './components/taskManager.js'
// import * as timeFunctions from './components/TimeContext';
import * as TesterPomo from './components/TesterPomo'

// import Pomodoro from './components/Pomodoro'

function App() {

  return (
    
    // 
    <div className="App">
        <TesterPomo.TimeProvider>
			
				<TesterPomo.Pomodoro />
		
		</TesterPomo.TimeProvider>
    <Home id='task'/>
    </div>

  );
}


export default App;