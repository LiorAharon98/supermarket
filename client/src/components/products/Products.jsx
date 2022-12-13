import { useDataProvider } from "../../context/DataProvider";
import style from "./products.module.css";
const Products = ({ name, price, pictureUrl, addToCart, cart, removeFromCart }) => {
  const { changeLanguage, user } = useDataProvider();
  if (!name) return;
  const findCurrent = cart.filter((item) => {
    return item.productName === name;
  });
  const clickHandler = (value) => {
    if (Object.keys(user).length === 0) return alert("only users can purchase ");
    if (value ==='add') return addToCart(name, price, pictureUrl);
    removeFromCart(name);
  };
  return (
    <div className={style.products}>
      <img className={style.product_img} src={pictureUrl} alt="error" />
      <p className={style.product_tag}>{changeLanguage(name)}</p>
      <p className={style.product_tag}>{price}₪</p>

      <div className={style.button_container}>
        <button className={style.button} onClick={clickHandler.bind(this,'add')}>
          +
        </button>
        <p className={style.input}>{findCurrent.length}</p>
      

        <button className={style.button} onClick={clickHandler}>
          -
        </button>
      </div>
    </div>
  );
};

export default Products;
