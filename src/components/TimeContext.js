import React from 'react';

const TimeContext = React.createContext();
const TimeProvider = props => {
    const [timer, setTimer] = React.useState({
        session: 1500,
        break: 300,
        mode: 'session',
        time: { currentTime: 1500, startingTime: 1500 },
        active: false,
        name: 'Pomodoro Timer',
        progress: 0
    });

    return (
        <TimeContext.Provider value={[timer, setTimer]}>
            {props.children}
        </TimeContext.Provider>
    );
};
export {TimeProvider, TimeContext} 