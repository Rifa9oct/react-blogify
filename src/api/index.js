import axios from "axios";

export const api = axios.create({
    baseURL: 'https://react-blogify-pink-tau.vercel.app'
})