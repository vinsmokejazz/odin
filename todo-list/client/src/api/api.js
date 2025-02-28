import axios from "axios";
import { config } from "dotenv";

const API=axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config)=>{
  const token=localStorage.getItem("token");
  if(token){
    config.headers.authorization=`Bearer ${token}`;
  }
  return config;
});
export default API;