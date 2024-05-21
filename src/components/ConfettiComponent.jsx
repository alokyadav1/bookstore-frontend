/* eslint-disable no-unused-vars */
import React from 'react'
import Confetti from 'react-confetti'

function ConfettiComponent() {
  return (
    <Confetti
        width={window.outerWidth-100}
        height={window.innerHeight}
        recycle={false}
    />
  )
}

export default ConfettiComponent