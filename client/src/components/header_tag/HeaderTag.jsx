import React from 'react'
import { useDataProvider } from '../../context/DataProvider'
import styles from "./header_tag.module.css"
const HeaderTag = ({text,classname}) => {
    const {changeLanguage} = useDataProvider()
  return (
    <>
        <h1 className={classname ? styles.homepage_text : styles.text} >{changeLanguage(text)}</h1>
    </>
  )
}

export default HeaderTag