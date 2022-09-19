import { useContext, createContext, useState } from "react";
import Axios from "axios";
import "../components/LanguageData";
import { useEffect } from "react";

export const DataContext = createContext();
export const useDataProvider = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [toggleLogOut, setToggleLogOut] = useState(false);
  const [toggleSort, setSort] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:5000/shopping-cart").then((response) => {
      const data = {
        users: response.data[0],
        products: response.data[1],
      };
      setUsers(data.users);
      setProducts(data.products);
    });
  }, []);

  const addProducts = (addedProducts) => {
    Axios.post("http://localhost:5000/shopping-cart/add-product", addedProducts).then((response) => {});
  };
  const deleteProduct = (productName) => {
    const product = { product: productName };
    Axios.delete("http://localhost:5000/shopping-cart/admin", {
      data: product,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
    });
  };
  const addUser = (username, email, password) => {
    const user = {
      username,
      email,
      password,
      shoppingHistory: [],
    };
    Axios.post("http://localhost:5000/shopping-cart/user/sign-up", user).then((response) => {
      console.log(response);
    });
  };
  const specificUser = (password, username) => {
    const findUser = users.find((user) => {
      return user.password === password && user.username === username;
    });
    if (findUser) setToggleLogOut(true);
    return findUser;
  };

  const addProductToUser = (username, total) => {
    const user = { username, total };
    Axios.post("http://localhost:5000/shopping-cart/user/payment", user).then((response) => {
      console.log(response);
    });

    setCart([]);
  };
  const isUserExist = (username) => {
    const checkUser = users.find((user) => {
      return user.username === username;
    });
    return checkUser;
  };
  const addToCart = (productName, price) => {
    setCart((prev) => {
      return [...prev, { productName: productName, price: price }];
    });
  };
  const updateProductPrice = (updatePrice, productName) => {
    const product = { price: updatePrice, productName: productName };
    Axios.post("http://localhost:5000/shopping-cart/admin", product).then((response) => {
      console.log(response);
    });
  };
  const sortProductsByPrice = (sortPrice) => {
    products.sort((a, b) => {
      if (sortPrice === "high") {
        if (a.price < b.price) return 1;
        if (a.price > b.price) return -1;
        return 0;
      }
      if (sortPrice === "low") {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      }
    });

    setSort((prev) => {
      return !prev;
    });
  };
  const value = {
    toggleLogOut,
    setToggleLogOut,
    sortProductsByPrice,
    updateProductPrice,
    isUserExist,
    deleteProduct,
    addProducts,
    products,
    addUser,
    users,
    specificUser,
    addProductToUser,
    addToCart,
    cart,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
export default DataProvider;
