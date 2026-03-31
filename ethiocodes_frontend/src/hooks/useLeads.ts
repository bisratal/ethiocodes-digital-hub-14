import api from "../lib/api";

export const createLead = async (data: any) => {
  const res = await api.post("/leads", data);
  return res.data;
};