import React from 'react'

const Sticker = ({ x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        background: 'yellow',
        width: '100px',
        height: '100px',
        padding: '20px',
      }}
    >
      Sticker
    </div>
  )
}

export default Sticker