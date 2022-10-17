import { useContext, createContext, useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { storage } from "../firebase";

export const DataContext = createContext();
export const useDataProvider = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [user, setUser] = useState();

  const baseUrl = "https://node-js-shopping-cart.herokuapp.com/shopping-cart";
  const localHostUrl = "http://localhost:8000/shopping-cart";
  const fetchData = () => {
    setSpinner(true);
    axios.get(baseUrl).then((response) => {
      setProducts(response.data);
      setSpinner(false);
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
          axios.post(`${baseUrl}/add-product`, result).then((response) => {
            fetchData();
          });
        });
      });
  };
  const deleteProduct = (productName) => {
    const product = { product: productName };
    axios
      .delete(`${baseUrl}/admin`, {
        data: product,
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
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
    axios.post(`${baseUrl}/user/sign-up`, user);
  };
  const specificUser =  (username, password) => {
    const user = { username, password };
    const axiosResponse = axios.post(`${baseUrl}/user/sign-in`, user).then((response) => {
      setUser(response.data[0]);
      return response.data[0];
    });
    return axiosResponse;
  };

  const userPaymentFunc = (username, total) => {
    const user = { username, total };
    axios.post(`${baseUrl}/user/payment`, user);
  };

  const updateProductPrice = (updatePrice, productName) => {
    const product = { price: updatePrice, productName: productName };
    axios.post(`${baseUrl}/admin`, product).then((response) => {
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
  };

  const value = {
    sortProductsByPrice,
    updateProductPrice,
    deleteProduct,
    addProducts,
    addUser,
    specificUser,
    userPaymentFunc,
    products,
    baseUrl,
    changeLanguage,
    spinner,
    user,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
export default DataProvider;
