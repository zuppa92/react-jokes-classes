import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

const JokeList = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJokes = useCallback(async () => {
    try {
      setLoading(true);
      const jokeSet = new Set();
      const fetchedJokes = [];
      while (fetchedJokes.length < 5) {
        const res = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        const joke = res.data.joke;
        if (!jokeSet.has(joke)) {
          jokeSet.add(joke);
          fetchedJokes.push({ id: res.data.id, joke, votes: 0 });
        }
      }
      console.log("Fetched jokes: ", fetchedJokes); // Debugging
      setJokes(fetchedJokes);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJokes();
  }, [fetchJokes]);

  const handleVote = (id, delta) => {
    setJokes((jokes) =>
      jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div className="JokeList">
      <h1>CheeZJokes</h1>
      <button onClick={fetchJokes}>Get New Jokes</button>
      <div className="JokeList-jokes">
        {jokes.map((j) => (
          <Joke key={j.id} joke={j} vote={handleVote} />
        ))}
      </div>
    </div>
  );
};

export default JokeList;