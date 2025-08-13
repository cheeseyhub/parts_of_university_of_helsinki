import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateVote } from "../services/requests";
import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const queryClient = useQueryClient();
  const newVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
    },
  });
  const handleVote = (anecdote) => {
    newVoteMutation.mutate(anecdote.id);
  };

  const queryResult = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  if (queryResult.isError) {
    return "Anecdote service not available";
  } else if (queryResult.isLoading) {
    return "Loading...";
  }

  const anecdotes = queryResult.data;
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
