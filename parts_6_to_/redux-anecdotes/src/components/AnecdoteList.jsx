import { useDispatch, useSelector } from "react-redux";
import { updateAnecdoteVote } from "../reducers/anecdoteReducer";
import { notificationRender } from "../reducers/notificationReducer";

export default function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    [...state.anecdotes].filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter)
    )
  );

  //Render notification and remove it later
  const vote = (id) => {
    dispatch(
      notificationRender(
        `you voted '${anecdotes.find((a) => a.id === id).content}'`,
        5000
      )
    );

    dispatch(updateAnecdoteVote(id));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
