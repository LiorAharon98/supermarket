import styles from "./card.module.css"
const Card = ({children,style,name}) => {
  return (
    <div style={style} className={name ? styles.productsPage :styles.container}>
 {children}
    </div>
  )
}

export default Card