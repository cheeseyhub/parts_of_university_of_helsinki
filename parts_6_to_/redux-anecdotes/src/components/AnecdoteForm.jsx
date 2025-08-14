import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { notificationRender } from "../reducers/notificationReducer";
export default function AnecdoteForm() {
  const dispatch = useDispatch();
  const new_anecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote_content.value;
    event.target.anecdote_content.value = "";
    if (content === "") {
      return;
    }
    dispatch(notificationRender(`you created '${content}'`, 5000));
    //Clear notification of vote after 5 seconds;
    dispatch(addAnecdote(content));
  };

  return (
    <section>
      <h2>create new</h2>
      <form onSubmit={new_anecdote}>
        <div>
          <input name="anecdote_content" />
        </div>
        <button type="submit">create</button>
      </form>
    </section>
  );
}
