import React from 'react';



const Progress = props => {
    let progress = new Array(4).fill(0).fill(true, 0, props.progress);
    return (
        <div>
            {progress.map((item, index) => (
                <span
                    key={index}
                    className={`dot ${progress[index] ? 'completed' : ''}`}
                ></span>
            ))}
        </div>
    );
};
export default Progress