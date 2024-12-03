import CryptoJS from "crypto-js";
import axios from "axios";

const LIVEURL = "https://api.potsec.edu.gh/";
const DEVURL = "http://localhost:8000/";
const uniqueBaseKey = "POTSECAPP0632KEY";

export const base = axios.create({
  baseURL: LIVEURL || DEVURL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en-US,en;q=0.9",
  },
});

base.interceptors.request.use((config) => {
  // console.log(config);
  const token = getData("uac");
  console.log("TOKEN", token);
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

export const isAuth = () => {
  return window.localStorage.getItem("uid");
};

export const encryptData = (secreteKey: string, data: any) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secreteKey + uniqueBaseKey
  ).toString();
};

export const decryptData = (secreteKey: string, data: any) => {
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data, secreteKey + uniqueBaseKey);
    return bytes.toString(CryptoJS.enc.Utf8) !== ""
      ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8) ?? "null")
      : null;
  }
};

export const saveData = (key: string, data: any) => {
  if (getData(key)) {
    removeData(key);
  }
  window.localStorage.setItem(key, encryptData(key, data));
};

export const getData = (key: string) => {
  return decryptData(key, window.localStorage.getItem(key) ?? "");
};

export const clearData = () => {
  window.localStorage.clear();
};

export const removeData = (key: string) => {
  window.localStorage.removeItem(key);
};

export const sessionTimeout = async () => {
  localStorage.clear();
};
