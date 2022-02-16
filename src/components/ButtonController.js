import React from 'react';
import Button from './Button';
import * as timeFunctions from './TimeContext';

function ButtonController(props) {
  const [timer, setTimer] = React.useContext(timeFunctions.TimeContext);

  const resetTime = (sessionValue) => {
      console.log(timer);
      setTimer({...timer,
          session: 1500,
          break: 300,
          mode: 'session',
          time: { currentTime: 1500, startingTime: 1500 },
          active: false,
          name: 'Pomodoro Timer',
          progress: 0,
          
      });
      props.myRef.current.pause();
      props.myRef.current.currentTime = 0;
  }

  const setActive = () => {
      setTimer({
          ...timer,
          active: !timer.active
      })
  }
  
  return (
      <div className="ButtonController">
          <Button buttonId="reset" type="reset" actionClick={() => resetTime()}>
              <i className="fas fa-undo-alt"></i>
          </Button>
          <Button buttonId="start_stop" type="play" actionClick={() => setActive()}>
              <i className={`fas ${timer.active ? "fa-pause" : "fa-play"}`}></i>
          </Button>
      </div>
  )
}
export default ButtonController