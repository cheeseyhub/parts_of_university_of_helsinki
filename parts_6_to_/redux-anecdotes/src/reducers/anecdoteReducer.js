import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../../services/anecdotes/anecdotesService";
const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecodteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    setVoteAnecdote(state = initialState, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);

      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    },
    setNewAnecdote(state = initialState, action) {
      return [...state, asObject(action.payload)].sort(
        (a, b) => b.votes - a.votes
      );
    },
    setAnecdotes(state = initialState, action) {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export const addAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.add(content);
    dispatch(setNewAnecdote(anecdote.content));
  };
};
export const updateAnecdoteVote = (id) => {
  return async (dispatch) => {
    await anecdotesService.update(id);
    dispatch(setVoteAnecdote(id));
  };
};
export const { setVoteAnecdote, setNewAnecdote, setAnecdotes } =
  anecodteSlice.actions;
export default anecodteSlice.reducer;
