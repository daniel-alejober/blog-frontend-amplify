import axiosClient from "../utils/axiosClient";

const createAccount = async (dataAccount) => {
  try {
    const { data } = await axiosClient.post("/users", dataAccount);
    return data;
  } catch (error) {
    const response = error.response;
    return response;
  }
};

const login = async (dataLogin) => {
  try {
    const data = await axiosClient.post("/users/login", dataLogin);
    return data;
  } catch (error) {
    const response = error.response;
    return response;
  }
};

const logout = async () => {
  try {
    const { data } = await axiosClient.get("/users/logout");
    return data;
  } catch (error) {
    const response = error.response;
    return response;
  }
};

export { createAccount, login, logout };
