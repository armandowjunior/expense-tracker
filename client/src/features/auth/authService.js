import axios from "axios";

const API_URL = "/api/users/";

//@desc Register new user
//@access PUBLIC
const register = async (user) => {
  const res = await axios.post(API_URL, user);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

//@desc Login user
//@access PUBLIC
const login = async (user) => {
  const res = await axios.post(API_URL + "login", user);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const authService = {
  register,
  login,
};

export default authService;
