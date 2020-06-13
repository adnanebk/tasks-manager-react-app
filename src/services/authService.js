import jwtDecode from "jwt-decode";
import http from "./httpService";
import {apiUrljWT} from '../config'
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
  const {data} = await http.post(apiUrljWT+"/authenticate", { username, password });
  console.log(data);
  localStorage.setItem(tokenKey, data.token);
}

export async function register(user) {
  return await http.post(apiUrljWT+"/register", user);}


export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  window.location = "/";
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export async function uploading(photo) {
  return await http.post(apiUrljWT+"/upload", photo);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  register,
  uploading
};
