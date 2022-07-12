import React from 'react'

const Spinner = ({borderColor, bgColor, zindex}) => {
  
    return (
        <div className= {"inline-block my-[-2px] " + zindex}>
            <div className={"w-[20px] h-[20px] rounded-[100%] border-2 border-solid border-r-[transparent] border-l-[transparent] animate-spin " + borderColor }></div>
        </div>
    )
}

export default Spinner
