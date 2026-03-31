import api from "../lib/api";

export const getBlogs = async () => {
  const res = await api.get("/blog");
  return res.data;
};

export const createBlog = async (data: any) => {
  const res = await api.post("/blog", data);
  return res.data;
};