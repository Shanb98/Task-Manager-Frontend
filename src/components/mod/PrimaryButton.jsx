import React from 'react'

function PrimaryButton( { label , eventname, bgcolor, textcolor, type }) {
  
  
    const buttonStyle = {
        backgroundColor:bgcolor,
        color: textcolor,
    }
  
  
    return (
    <button
    type="submit"
    className="w-full rounded-md h-[44px] mt-3 "
    onClick={eventname}
    style={buttonStyle}
    >
{label}
    </button>
  )
}

export default PrimaryButton
