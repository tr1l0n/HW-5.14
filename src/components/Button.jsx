import React from 'react'
import "../styles.css";
export const Button = ({ onLoad }) => {
  return (
    <button type='button' onClick={onLoad}>Load more</button>
  )
}


