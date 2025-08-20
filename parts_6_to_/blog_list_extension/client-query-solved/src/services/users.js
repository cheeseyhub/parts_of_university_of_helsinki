import axios from "axios";
const baseurl = "http://localhost:3001/api/users";

const getAll = async () => {
  const request = await axios.get(baseurl);
  return request.data;
};
const register = async (obj) => {
  const request = await axios.post(baseurl, obj);
  return request.data;
};
export default { getAll, register };
