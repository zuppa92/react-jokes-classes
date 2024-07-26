import React from "react";
import "./Joke.css";

const Joke = ({ joke, vote }) => {
  return (
    <div className="Joke">
      <div className="Joke-text">{joke.joke}</div>
      <div className="Joke-votes">
        <button onClick={() => vote(joke.id, +1)}>👍</button>
        <span>{joke.votes}</span>
        <button onClick={() => vote(joke.id, -1)}>👎</button>
      </div>
    </div>
  );
};

export default Joke;