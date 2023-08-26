import React, { useEffect, useRef, useState } from 'react'



const Bar = ({val,max}) => {
    return (
        <div className=' border border-slate-500 bg-slate-200 w-3/4 mx-auto rounded-full'>
            <div className="bg-green-100 h-7 leading-none rounded-full" style={{ width: `${val*100/max}%` }}>
            </div>
        </div>
    )
}


const ProgressBar = () => {
    const MAX_VALUE=20;
    const[val,setVal]=useState(0);
    useEffect(()=>{
        let id=setInterval(()=>{
            setVal(prev=>{
                if(prev===MAX_VALUE){
                    clearInterval(id);
                    return prev;
                }
                else return prev+1;
            });
        },1000)
        return ()=>{
            clearInterval(id);
        }
    },[val])
    
    return (
           <Bar val={val} max={MAX_VALUE}/>
    )
}

export default ProgressBar

