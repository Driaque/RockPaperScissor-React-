import React, { Component } from "react";
import ReactDOM from "react-dom";
import Player from "./player";
import "./styles.css";

const moves = ["rock", "paper", "scissors"];
const modes = ["bestOf3", "bestOf5"];
const types = ["random", "tactical"];

class App extends Component {
  state = { 
    player: moves[0], //Keep track of player selection
    computer: moves[0], //Keep track of computer selection
    lastChoice: moves[0], //Keep track of computer's last selection
    mode: modes[0], // Keep track of mode(i.e how many rounds)
    type: types[0], // keep track of Computer type
    playerScore: 0, // keep track of Player's Score
    computerScore: 0, // keep track of Computer's Score
    round:3, //default is Best of 3
    nextBest:"",
    winner: "",
    finalWinner: "",
  };

  startGame = () => {
    let counter = 0, rounds =3
    let gameInterval = setInterval(() => {
      // alert("Select Computer type and Round to Begin")
      if(this.state.type === "tactical"){
        this.nextBest = this.selectNextBestMove(this.lastChoice)
        this.playTactical() //Play tactically
      }else{
        this.lastChoice = this.playRandom() //Play random for Computer
      }
      rounds = this.state.round
      // if (counter > 5) {
      //   clearInterval(gameInterval);
      //   this.setState({
      //     winner: this.selectWinner()
      //   });
      // }
      while (counter < rounds){
        counter++;
        this.setState({
          winner: this.selectWinner()
        });
      }
      clearInterval(gameInterval);
    }, 100);
  };

  //selectMode
  selectMode = mode => {
    let round = 0;
    if (mode === "bestOf3"){
      round = 3;
    }else if(mode === "bestOf5"){
      round = 5;
    }else{
      return "Select Mode"
    }
    this.setState({
      mode: mode,
      round: round,
      playerScore: 0,
      computerScore: 0
    });
  };
  //select Computer Type
  selectType = type => {
    if(type ==="tactical"){
      type = "tactical"
    }else{
      type = "random"
    }
    this.setState({
      type: type,
      playerScore: 0,
      computerScore: 0
      });
  };
  selectWinner = () => {
    const { player, computer,  } = this.state;

    if (player === computer) {
      return "It's a Draw!";
    } else if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      // this.updatePlayerScore()
      return "Player Wins!";
    } else {
      // this.updateComputerScore(1)
      return "Computer Wins!";
    }
  };

  displayWinner = (playerScore, computerScore) =>{
    
    if(playerScore > computerScore){
      return "Player Wins the Game"
    }else if(playerScore === computerScore){
      return "This Game has no Winner!"
    }else{
      return "Computer Wins the Game"
    }
  }
  selectMove = move => {
    this.setState({
      player: move,
      winner: ""
    });
  };
  //playRandom
  playRandom = () =>{
    let move =""
    move = moves[Math.floor(Math.random() * moves.length)]
    this.lastChoice = move
    let next=""
    next = this.selectNextBestMove(this.lastChoice)
    console.log(next)
    this.setState({
      computer: move,
      lastChoice: this.lastChoice,
      nextBest: next
    });
  }
  playTactical = () =>{
    console.log('playing tactical')
    let move ="",lastChoice=this.lastChoice, nextBest =this.nextBest
    nextBest = nextBest??this.selectNextBestMove(this.lastChoice)
    move = nextBest //Play next Best 
    lastChoice = move //update last choice
    nextBest = this.selectNextBestMove(lastChoice) // update next best
    this.setState({
      computer: move,
      lastChoice: lastChoice,
      nextBest: nextBest
    });
  }
  // update Player Score
  updatePlayerScore = () => {
    // this.setState((preState) => {
    //   return {
    //     playerScore : preState.playerScore + 1
    //     };
    //   this.setState((prevState, props) => ({
    //     playerScore: prevState.playerScore + 1
    // })); 

  }
  

  // update Computers Score
  updateComputerScore = (step) => {
    let  computerScore = this.state.computerScore;
    this.setState({
      computerScore: computerScore,
      });
  }

  //update next Best
  updateNextBest = (nextBest) => {
    this.setState({ nextBest: nextBest});
  }
  //selectNextBestMove
  selectNextBestMove = (lastChoice) => {
    // const {  lastChoice } = this.state;

    switch(lastChoice) {
      case 'rock':
        this.updateNextBest("paper")
        return 'paper';
      case 'paper':
        this.updateNextBest("scissors")
        return 'scissors';
      case 'scissors':
        this.updateNextBest("rock")
        return 'rock';
      default:
        return moves[Math.floor(Math.random() * moves.length)];
    }
  };
  render() {
    const { player, computer, winner, final,  playerScore, computerScore } = this.state;
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Rock Paper Scissors</h1>
        <div>Select Computer type and Round to Begin</div>
        <div class="gamesetting">
        <button
            className="moveBtn"
            onClick={() => this.selectType("random")}
          >
            Random
          </button>
        <button
            className="moveBtn"
            onClick={() => this.selectType("tactical")}
          >
            Tactical AI
          </button>
          <button
            className="moveBtn"
            onClick={() => this.selectMode("bestOf3")}
          >
            Best Of 3
          </button>
          <button
            className="moveBtn"
            onClick={() => this.selectMode("bestOf5")}
          >
            Best Of 5
          </button>
        
        </div>
        <div>
          <Player move={player} />
          <Player move={computer} />
        </div>
        <div>
          <button
            className="moveBtn"
            onClick={() => this.selectMove("rock")}
          >
            rock
          </button>
          <button
            className="moveBtn"
            onClick={() => this.selectMove("paper")}
          >
            paper
          </button>
          <button
            className="moveBtn"
            onClick={() => this.selectMove("scissors")}
          >
            scissor
          </button>
        </div>
        <div className="winner"> {winner ? this.selectWinner() : null}</div>
        <div className="finalWin"> {this.displayWinner() ?? null}</div>
        <button type="button" onClick={this.startGame}>
          Play!
        </button>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
