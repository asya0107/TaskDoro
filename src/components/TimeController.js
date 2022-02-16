import React from 'react';
import Button from './Button';
import * as timeFunctions from './TimeContext';


function TimeController(props) {
  const [timer, setTimer] = React.useContext(timeFunctions.TimeContext);
  console.log('timer:',timer)

  // update session time / break time on click
  const changeTimer = operator => {
      let mode = timer.mode;
      console.log(mode);
      if (timer.mode === props.type) {
          console.log('same mode');
          if (operator === 'decrement' && timer[props.type] > 60) {
              //if the current mode && the type are equal change the currentTime & startingTime
              setTimer({
                  ...timer,
                  [props.type]: timer[props.type] - 60, // change session / break time
                  time: {
                      currentTime: timer[timer.mode] - 60,
                      startingTime: timer[timer.mode] - 60
                  }
              });
          }
          if (operator === 'increment' && timer[props.type] < 3600) {
              setTimer({
                  ...timer,
                  [props.type]: timer[props.type] + 60,
                  time: {
                      currentTime: timer[timer.mode] + 60,
                      startingTime: timer[timer.mode] + 60
                  }
              });
          }
      } else {
          let time = timer.time;
          if (operator === 'decrement' && timer[props.type] > 60) {
              //if the current mode && the type are equal change the currentTime & startingTime
              setTimer({
                  ...timer,
                  [props.type]: timer[props.type] - 60, // change session / break time
                  time: time
              });
          }
          if (operator === 'increment' && timer[props.type] < 3600) {
              setTimer({
                  ...timer,
                  [props.type]: timer[props.type] + 60,
                  time: time
              });
          }
      }
  };
  
  return (
      <div className="TimeController">
          <Button
              actionClick={() => changeTimer('decrement')}
              className="controlButton"
              buttonId={`${props.type}-decrement`}
          >
              -
          </Button>
          <div className="wrapperDisplay">
              <span id={props.labelId} className="label">
                  {props.label}
              </span>
              
              <span id={props.lengthId} className="time">
                  {timer[props.type] / 60}
              </span>
              
          </div>
          <Button
              actionClick={() => changeTimer('increment')}
              className="controlButton"
              buttonId={`${props.type}-increment`}
          >
              +
          </Button>
      </div>
  );
}
export default TimeController