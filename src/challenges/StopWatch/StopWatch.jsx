import React, { useEffect, useState } from 'react'
import { useRef } from 'react';


const parseNumber = (num) => {
    if (num <= 9) return "0" + num.toString()
    return num.toString();
}

//0=> rest state
//1=> running State
const StopWatch = () => {
    const [time,setTime]=useState({
        sec:0,
        min:0,
        hour:0
    })
    const [currState,setCurrState]=useState(0);
    const intervalRef = useRef(0);

    function handleStartClick() {
        const intervalId = setInterval(() => {
            setTime(prev=>{
                const newTime={...prev};
                if(newTime.sec+1===60){
                    newTime.min+=1;
                    newTime.sec=0;
                }
                else newTime.sec+=1;
                if(newTime.min+1===60){
                    newTime.hour+=1;
                    newTime.min=0;
                }
                return newTime;
            })
        }, 1000);
        intervalRef.current = intervalId;
        setCurrState(1);
    }

    function handlePauseClick() {
        const intervalId = intervalRef.current;
        clearInterval(intervalId);
        setCurrState(0);
    }

    function handleReset(){
        handlePauseClick();
        setTime({
            sec:0,
            min:0,
            hour:0
        })
    }

    return (
        <div className='text-center'>
            <span className='text-4xl'>{parseNumber(time.hour)} : {parseNumber(time.min)} : {parseNumber(time.sec)}</span>
            <br />
            <div className='py-6'>
                {
                    currState === 0 ? (
                        <button type="button" onClick={handleStartClick} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Start</button>
                    ) : (
                        <button type="button" onClick={handlePauseClick} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Pause</button>
                    )
                }
                <button type="button" onClick={handleReset} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Reset</button>
            </div>
        </div>
    )
}

export default StopWatch