import axios from "axios";
import { baseUrl } from "./endpoints";

const APIService = axios.create({
  baseURL: baseUrl,
});

export default APIService;
