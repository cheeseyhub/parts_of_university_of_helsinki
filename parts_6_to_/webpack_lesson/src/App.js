import "./index.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setNotes(response.data);
    });
  }, [url]);
  return notes;
};
const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const notes = useNotes(BACKEND_URL);
  console.log(notes);
  const handleclick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };
  return (
    <div className="container">
      Hello webpack {counter} clicks
      <button onClick={handleclick}>Press</button>
      <div>
        {notes.length} notes on server {BACKEND_URL}
      </div>
    </div>
  );
};
export default App;
