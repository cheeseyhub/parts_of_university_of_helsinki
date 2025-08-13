import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes/";

export const getAnecdotes = () => {
  return axios.get(baseURL).then((res) => {
    return res.data;
  });
};
export const addAnecdote = (content) => {
  return axios.post(baseURL, { content, votes: 0 }).then((res) => res.data);
};
export const updateVote = (id) => {
  return getAnecdotes().then((anecdotes) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    return axios.put(`${baseURL}/${id}`, updatedAnecdote).then((res) => res.data);
  })
}
