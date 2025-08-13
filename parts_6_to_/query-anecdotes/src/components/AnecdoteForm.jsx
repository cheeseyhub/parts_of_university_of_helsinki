import { addAnecdote } from "../../services/requests";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";
const AnecdoteForm = () => {
  const [notificationState, notificationDispatch] =
    useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      notificationDispatch({
        type: "ERROR",
        payload: `${error.response.data.error}`,
      });
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate(content);
    notificationDispatch({
      type: "ADDNOTIFICATION",
      payload: `${content}`,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
