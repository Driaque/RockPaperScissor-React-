import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const moves = ["rock", "paper", "scissors"];

const moveEmoji = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

class App extends Component {
  state = {
    player: null,
    computer: null,
    lastChoice: "",
    nextBest: "",
    mode: "bestOf3",
    type: "random",
    totalRounds: 3,
    roundsPlayed: 0,
    playerScore: 0,
    computerScore: 0,
    roundResult: "",
    finalWinner: "",
    revealKey: 0,
  };

  resetScores = (overrides = {}) => ({
    player: null,
    computer: null,
    lastChoice: "",
    nextBest: "",
    playerScore: 0,
    computerScore: 0,
    roundsPlayed: 0,
    roundResult: "",
    finalWinner: "",
    ...overrides,
  });

  selectMode = (mode) => {
    const totalRounds = mode === "bestOf5" ? 5 : 3;
    this.setState(this.resetScores({ mode, totalRounds }));
  };

  selectType = (type) => {
    this.setState(this.resetScores({ type, totalRounds: this.state.totalRounds }));
  };

  selectMove = (move) => {
    if (this.state.finalWinner) return;
    this.setState({ player: move, roundResult: "" });
  };

  playRound = () => {
    const { player, type, totalRounds, roundsPlayed } = this.state;
    if (!player || roundsPlayed >= totalRounds) return;

    const computerMove =
      type === "tactical" ? this.computeTacticalMove() : this.randomMove();

    const result = this.judge(player, computerMove);
    const playerScore = this.state.playerScore + (result === "Player" ? 1 : 0);
    const computerScore = this.state.computerScore + (result === "Computer" ? 1 : 0);
    const nextRoundsPlayed = roundsPlayed + 1;

    let finalWinner = "";
    if (nextRoundsPlayed >= totalRounds) {
      if (playerScore > computerScore) finalWinner = "Player wins the game! 🏆";
      else if (computerScore > playerScore) finalWinner = "Computer wins the game 🤖";
      else finalWinner = "It's a tie game!";
    }

    this.setState({
      computer: computerMove,
      lastChoice: computerMove,
      nextBest: this.counterMove(computerMove),
      playerScore,
      computerScore,
      roundsPlayed: nextRoundsPlayed,
      roundResult: result,
      finalWinner,
      revealKey: this.state.revealKey + 1,
    });
  };

  randomMove = () => moves[Math.floor(Math.random() * moves.length)];

  computeTacticalMove = () => {
    const { lastChoice, nextBest } = this.state;
    if (!lastChoice) return this.randomMove();
    return nextBest || this.randomMove();
  };

  counterMove = (move) => {
    switch (move) {
      case "rock": return "paper";
      case "paper": return "scissors";
      case "scissors": return "rock";
      default: return this.randomMove();
    }
  };

  judge = (player, computer) => {
    if (player === computer) return "Draw";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      return "Player";
    }
    return "Computer";
  };

  resetGame = () => {
    this.setState(this.resetScores({ totalRounds: this.state.totalRounds }));
  };

  roundResultLabel = () => {
    const { roundResult } = this.state;
    if (roundResult === "Player") return { text: "You win this round!", cls: "win" };
    if (roundResult === "Computer") return { text: "Computer wins this round", cls: "lose" };
    if (roundResult === "Draw") return { text: "It's a draw", cls: "draw" };
    return null;
  };

  render() {
    const {
      player, computer, mode, type,
      totalRounds, roundsPlayed,
      playerScore, computerScore,
      finalWinner, revealKey,
    } = this.state;

    const roundLabel = this.roundResultLabel();
    const gameOver = !!finalWinner;
    const playerWinning = playerScore > computerScore;
    const computerWinning = computerScore > playerScore;

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Rock · Paper · Scissors</h1>
          <p className="subtitle">Pick your opponent, choose your mode, and make your move.</p>
        </header>

        <section className="card settings">
          <div className="settings-group">
            <span className="settings-label">Opponent</span>
            <div className="chip-row">
              <button
                className={`chip ${type === "random" ? "active" : ""}`}
                onClick={() => this.selectType("random")}
              >
                <span role="img" aria-label="dice">🎲</span> Random
              </button>
              <button
                className={`chip ${type === "tactical" ? "active" : ""}`}
                onClick={() => this.selectType("tactical")}
              >
                <span role="img" aria-label="brain">🧠</span> Tactical AI
              </button>
            </div>
          </div>

          <div className="settings-group">
            <span className="settings-label">Mode</span>
            <div className="chip-row">
              <button
                className={`chip ${mode === "bestOf3" ? "active" : ""}`}
                onClick={() => this.selectMode("bestOf3")}
              >
                Best of 3
              </button>
              <button
                className={`chip ${mode === "bestOf5" ? "active" : ""}`}
                onClick={() => this.selectMode("bestOf5")}
              >
                Best of 5
              </button>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="status-bar">
            <span className="rounds-pill">
              Round {Math.min(roundsPlayed + (gameOver ? 0 : 1), totalRounds)} / {totalRounds}
            </span>
            {roundLabel && !gameOver && (
              <span className={`round-result ${roundLabel.cls}`}>{roundLabel.text}</span>
            )}
          </div>

          <div className="scoreboard" style={{ marginTop: 16 }}>
            <div className={`score-panel ${gameOver && playerWinning ? "winner-glow" : ""} ${gameOver && computerWinning ? "loser-fade" : ""}`}>
              <span className="score-label">You</span>
              <span key={`p-${revealKey}`} className={`move-display ${player ? "revealing" : ""}`}>
                {player ? moveEmoji[player] : "❔"}
              </span>
              <span className="score-value">{playerScore}</span>
            </div>

            <div className="vs-divider">VS</div>

            <div className={`score-panel ${gameOver && computerWinning ? "winner-glow" : ""} ${gameOver && playerWinning ? "loser-fade" : ""}`}>
              <span className="score-label">{type === "tactical" ? "Tactical AI" : "Computer"}</span>
              <span key={`c-${revealKey}`} className={`move-display ${computer ? "revealing" : ""}`}>
                {computer ? moveEmoji[computer] : "❔"}
              </span>
              <span className="score-value">{computerScore}</span>
            </div>
          </div>

          {gameOver && <div className="final-banner" style={{ marginTop: 16 }}>{finalWinner}</div>}
        </section>

        <section className="card">
          <span className="settings-label" style={{ marginBottom: 10, display: "block" }}>
            Choose your move
          </span>
          <div className="controls">
            {moves.map((m) => (
              <button
                key={m}
                className={`move-btn ${player === m ? "active" : ""}`}
                onClick={() => this.selectMove(m)}
                disabled={gameOver}
              >
                <span className="emoji" aria-hidden="true">{moveEmoji[m]}</span>
                <span style={{ textTransform: "capitalize" }}>{m}</span>
              </button>
            ))}
          </div>

          <div className="actions" style={{ marginTop: 16 }}>
            <button
              className="btn btn-primary"
              onClick={this.playRound}
              disabled={!player || gameOver}
            >
              {gameOver ? "Game Over" : "Play Round"}
            </button>
            <button className="btn btn-ghost" onClick={this.resetGame}>
              Reset
            </button>
          </div>
        </section>

        <p className="footer-note">Built with React · Responsive on any device</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
