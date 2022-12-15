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
  const [toggleModal, setToggleModal] = useState(false);
  const [user, setUser] = useState({});
 
  const baseUrl = "https://node-js-supermarket.herokuapp.com/supermarket";
  const localhostUrl = "http://localhost:8000/supermarket";
  const fetchData = async () => {
    setSpinner(true);
    const response = await axios.get(baseUrl);
    setProducts(response.data);
    setSpinner(false);
  };
  useEffect(() => {
    const data = sessionStorage.getItem("key");
    if (data) setUser(JSON.parse(data));
    fetchData();
  }, []);
  useEffect(() => {
    if (Object.keys(user).length > 0) sessionStorage.setItem("key", JSON.stringify(user));
  }, [user]);

  const changeLanguage = (value) => {
    return t(value).toLocaleLowerCase();
  };

  const addProducts = async (addedProducts, picture) => {
    const storageRef = ref(storage, `/products-images/${picture.name}`);

    await uploadBytes(storageRef, picture);

    const pictureUrl = await getDownloadURL(storageRef);

    const finalProduct = {...addedProducts, pictureUrl};
    console.log(finalProduct)
    await axios.post(`${baseUrl}/admin`, finalProduct);
    fetchData();
  };
  const deleteProduct = async (productName) => {
    const product = { product: productName };
    await axios.delete(`${baseUrl}/admin`, {
      data: product,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json",
      },
    });
    await fetchData();
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
  const specificUser = async (username, password) => {
    const user = { username, password };
    const axiosResponse = await axios.post(`${baseUrl}/user/sign-in`, user);
    const response = await axiosResponse.data[0];
    if (!response) return false;
    return response;
  };

  const userPaymentFunc = async (username, total) => {
    const user = { username, total };
    await axios.post(`${baseUrl}/user/payment`, user);
  };

  const updateProductPrice = async (updatePrice, productName) => {
    const product = { price: updatePrice, productName: productName };
    await axios.put(`${baseUrl}/admin`, product);
    fetchData();
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
    sessionStorage.removeItem("key");
  };
  const changeModal = () => {
    setToggleModal(true);
  };
  const closeModal = ()=>{
  
    setToggleModal(false);
  }

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
