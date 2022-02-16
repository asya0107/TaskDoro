import React from 'react';


const Timer = (props) => {
    
  function formatTime(time){ 
      let minutes = Math.floor(time / 60);
      if(minutes < 10){
          minutes = "0"+minutes
      }
      let seconds = Math.floor(time - minutes * 60);
      if(seconds < 10){
          seconds = "0"+seconds
      }
      return `${minutes}:${seconds}`;
  }
  console.log('currentTime:',props.time.currentTime)
  return (
      <div className="wrapper">
          <div className="counter">
              <span className="counterType" id="timer-label">{props.mode}</span>
              <span id="time-left">{formatTime(props.time.currentTime)}</span>
          </div>
      </div>
  );
}
export default Timer