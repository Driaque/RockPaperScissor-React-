import React from "react";

const Player = ({ move }) => (
  <>
    <div className="player">
      <img
        className="player-image"
        src={
          move === "rock" ? "/rock.jpg" : move === "scissors" ? "/scissors.png" : "./paper.png"
        }
        alt="Rock Paper Scissors"
      />
    </div>
  </>
);

export default Player;
