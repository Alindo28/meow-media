import React from 'react'

const LoadingLogo = ({ size = 180, textV=true }) => {
  return (
    <div className="flex h-screen items-center justify-center flex-col gap-y-0.5">
      <img
        src="../mmlogo.png"
        alt="loading"
        className="animate-spin"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: '1s',
          animationTimingFunction: 'ease-in-out',
        }}
      />
      {textV && <div className="text-2xl">loading...</div>}
    </div>
  )
}

export default LoadingLogo
