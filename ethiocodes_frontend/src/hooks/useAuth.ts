import api from "../lib/api";

export const register = async (data: any) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: any) => {
  const res = await api.post("/auth/login", data);

  // save token
  localStorage.setItem("token", res.data.token);

  return res.data;
};