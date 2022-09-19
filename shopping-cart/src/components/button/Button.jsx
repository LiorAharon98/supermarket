import React from 'react'
import styles from "./button.module.css"
const Button = ({text,onClick}) => {
  return (
    <div className={styles.button_container} >
        <button id={styles.button} onClick={onClick} >{text}</button>
    </div>
  )
}

export default Button