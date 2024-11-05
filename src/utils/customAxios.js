import axios from "axios";

const ADDRESS = import.meta.env.VITE_API_ADDRESS;

const createPublicAxios = () => {
  return axios.create({
    baseURL: `${ADDRESS}`,
  });
};
const publicAxios = createPublicAxios();

export { publicAxios };
