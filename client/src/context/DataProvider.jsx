import { useContext, createContext, useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Axios from "axios";
import { useTranslation } from "react-i18next";

import { storage } from "../firebase";

export const DataContext = createContext();
export const useDataProvider = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [spinner,setSpinner] = useState(false)
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [toggleLogOut, setToggleLogOut] = useState(false);
  const [toggleSort, setSort] = useState(false);
  const baseUrl = "https://node-js-shopping-cart.herokuapp.com/shopping-cart";
  const fetchData = () => {
    setSpinner(true)
     Axios.get(baseUrl).then((response) => {
      const data = {
        users: response.data[0],
        products: response.data[1],
      };
      setUsers(data.users);
      setProducts(data.products);
      setSpinner(false)
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const changeLanguage = (value) => {
    return t(value).toLocaleLowerCase();
  };
  const addProducts = (addedProducts, picture) => {
    const storageRef = ref(storage, `/products-images/${picture.name}`);

    uploadBytes(storageRef, picture)
      .then((snapshot) => {})
      .then(() => {
        getDownloadURL(storageRef).then((res) => {
          const result = [...addedProducts, res];
          Axios.post(`${baseUrl}/add-product`, result).then((response) => {
            fetchData();
          });
        });
      });
  };
  const deleteProduct = (productName) => {
    const product = { product: productName };
    Axios.delete(`${baseUrl}/admin`, {
      data: product,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      fetchData();
    });
  };
  const addUser = (username, email, password) => {
    const user = {
      username,
      email,
      password,
      shoppingHistory: [],
    };
    Axios.post(`${baseUrl}/user/sign-up`, user).then((response) => {
      fetchData();
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
    Axios.post(`${baseUrl}/user/payment`, user).then((response) => {
      fetchData();
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
    Axios.post(`${baseUrl}/admin`, product).then((response) => {
      fetchData();
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
    products,
    baseUrl,
    changeLanguage,
    spinner
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
export default DataProvider;
