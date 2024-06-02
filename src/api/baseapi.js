import axios from "axios";

const token = localStorage.getItem("airtribebuy-cart")

const AIRTRIBE_API = axios.create({
    baseURL: 'https://fakestoreapi.com',
})

export default AIRTRIBE_API