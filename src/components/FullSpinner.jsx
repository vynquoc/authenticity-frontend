import React from 'react'

const FullSpinner = () => {
    return (
        <div className= {"fixed top-0 left-0 w-full h-full z-50 bg-white opacity-90"}>
            <div className={"w-[80px] h-[80px] rounded-[100%] border-[5px]  border-red-700 fixed top-1/2 left-[45%] border-solid border-r-[transparent] border-l-[transparent] animate-spin"}></div>
        </div>
    )
}

export default FullSpinner
