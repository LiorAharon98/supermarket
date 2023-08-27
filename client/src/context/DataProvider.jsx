import { useContext, createContext, useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import axios from "axios";
import { useCookies } from "react-cookie";
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
  const [toggleModal, setToggleModal] = useState(false);
  const [user, setUser] = useState(() => {
    const data = sessionStorage.getItem("key");
    return data ? JSON.parse(data) : {};
  });
  const [cookies, setCookies] = useCookies("");

  const baseUrl = "https://node-js-supermarket.herokuapp.com/supermarket";
  const localhostUrl = "http://localhost:8000/supermarket";
  const fetchData = async () => {
    setSpinner(true);
    const response = await axios.get(baseUrl);
    setProducts(response.data);
    setSpinner(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (Object.keys(user).length > 0) sessionStorage.setItem("key", JSON.stringify(user));
  }, [user]);

  const changeLanguage = (value) => {
    return t(value).toLocaleLowerCase();
  };

  const addProducts = async (addedProducts, picture) => {
    try {
      const storageRef = ref(storage, `/products-images/${addedProducts.name}`);

      await uploadBytes(storageRef, picture);

      const pictureUrl = await getDownloadURL(storageRef);

      const finalProduct = { ...addedProducts, pictureUrl };
      await axios.post(`${baseUrl}/admin`, finalProduct);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (productName) => {
    const product = { product: productName };
    try {
      const storageRef = ref(storage, `/products-images/${productName}`);
      await axios.delete(`${baseUrl}/admin`, {
        data: product,
      });
      await deleteObject(storageRef);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const addUser = async (username, email, password) => {
    const user = {
      username,
      email,
      password,
      shoppingHistory: [],
    };
    try {
      const response = await axios.post(`${baseUrl}/user/sign-up`, user);

      return response.data ? true : false;
    } catch (error) {
      console.log(error);
    }
  };
  const specificUser = async (username, password) => {
    const user = { username, password };
    const axiosResponse = await axios.post(`${baseUrl}/user/sign-in`, user);
    if (!axiosResponse.data) return false;
    setUser(axiosResponse.data[0]);
    setCookies("jwt", axiosResponse.data[1]);
    sessionStorage.setItem("key", JSON.stringify(axiosResponse.data[0]));

    return axiosResponse.data;
  };

  const userPaymentFunc = async (username, total, email, cart) => {
    const user = { username, total, email, cart, token: cookies.jwt };

    try {
      await axios.post(`${baseUrl}/user/payment`, user);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductPrice = async (updatePrice, productName) => {
    const product = { price: updatePrice, productName, token: cookies.jwt };
    try {
      await axios.put(`${baseUrl}/admin`, product);
      fetchData();
    } catch (error) {
      console.log(error);
    }
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
  const logOut = () => {
    setUser({});
    setCookies("jwt", "");
    sessionStorage.removeItem("key");
  };
  const changeModal = () => {
    setToggleModal(true);
  };
  const closeModal = () => {
    setToggleModal(false);
  };

  const value = {
    setToggleModal,
    toggleModal,
    changeModal,
    closeModal,
    setUser,
    logOut,
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
