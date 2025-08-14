import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const add = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseURL, object);
  return response.data;
};
const update = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`);
  const anecdote = response.data;
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response2 = await axios.put(`${baseURL}/${id}`, updatedAnecdote);
  return response2.data;
};
export default { getAll, add, update };
