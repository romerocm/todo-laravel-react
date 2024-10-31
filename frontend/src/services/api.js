import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const TaskService = {
  getTasks: async () => {
    const { data } = await api.get("/tasks");
    return data;
  },

  createTask: async (task) => {
    const { data } = await api.post("/tasks", task);
    return data;
  },

  updateTask: async (id, task) => {
    const { data } = await api.put(`/tasks/${id}`, task);
    return data;
  },

  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
  },
};

export const CategoryService = {
  getCategories: async () => {
    const { data } = await api.get("/categories");
    return data;
  },

  createCategory: async (category) => {
    const { data } = await api.post("/categories", category);
    return data;
  },

  deleteCategory: async (id) => {
    await api.delete(`/categories/${id}`);
  },
};

export default api;
