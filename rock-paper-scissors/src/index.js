import React, { Component } from "react";
import ReactDOM from "react-dom";
import Player from "./player";
import "./styles.css";
import paper from "./assets/paper.png";
import rock from "./assets/rock.png";
import scissors from "./assets/scissors.png";


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

      if (this.state.type === "tactical"){
       // this.nextBest = this.selectNextBestMove(this.lastChoice)
        this.playTactical() //Play tactically
      }
      if (this.state.type === "random"){
        this.lastChoice = this.playRandom() //Play random for Computer
      }
      rounds = this.state.round
      this.setState({
        winner: this.selectWinner()
      });
      this.scoreWinner()
      this.checkRounds()
      this.displayWinner()
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
      computerScore: 0,
      // nextBest:"",
      lastChoice:""
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
      computerScore: 0,
      // nextBest:"",
      lastChoice:"",
      round: 3 //default of 3
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
      return "Player";
    } else {
      return "Computer";
    }
  };

  scoreWinner = () => {
    const { winner } = this.state;
    if(winner === "Player" ){
      this.updatePlayerScore(1)
    }else if( winner === "Computer"){
      this.updateComputerScore(1)
    }else{
      return "No winner"
    }
  };

  displayWinner = () =>{
    const { playerScore, computerScore } = this.state;
    if(this.state.round == 0){
      if(playerScore > computerScore){
        return "Player Wins the Game"
      }else if(playerScore === computerScore){
        return "This Game has no Winner!"
      }else{
        return "Computer Wins the Game"
      }
    }
    
  }
  selectMove = move => {
    this.setState({
      player: move,
      winner: ""
    });
  };
  //checkRounds
  checkRounds = () => {
    if(this.state.round >= 0){
      this.setState({
      round: this.state.round -1
    });
    }else{
      this.setState({
        round: 0
      });
    }
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
    //const {  lastChoice, nextBest } = this.state;
    let move ="",lastChoice=this.state.lastChoice, nextBest=this.state.nextBest
    if(lastChoice ===""){
      move =moves[Math.floor(Math.random() * moves.length)];
    }else{
      move = nextBest //Play next Best 
    }

    lastChoice = move //update last choice
    nextBest = this.selectNextBestMove(lastChoice) // update next best
    this.setState({
      computer: move,
      lastChoice: lastChoice,
      nextBest: nextBest
    });
  }
  // update Player Score 
  updatePlayerScore = (step) => {
    let  playerScore = this.state.playerScore;
    this.setState({
      playerScore: playerScore + step,
      });
  }
  // update Computers Score
  updateComputerScore = (step) => {
    let  computerScore = this.state.computerScore;
    this.setState({
      computerScore: computerScore + step,
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
      case '':
        return moves[Math.floor(Math.random() * moves.length)];
      default:
        return moves[Math.floor(Math.random() * moves.length)];
    }
  };
  render() {
    var playerMove = this.state.player;
    var computerMove = this.state.computer;
    const { player, computer, winner, final,  playerScore, computerScore } = this.state;
    return (
      <>
        <div className="header">
        <header>
        <h1 style={{ textAlign: "center" }}>Rock Paper Scissors.com</h1>
        </header>
        </div>
        <div className="sys_msg"><b>Please select Computer Type and preferred number of Round to Begin</b></div>
        <div class="gamesetting" style={{ display: "flex" }}>
        <button
            style={{ marginLeft: 0 , backgroundColor: "orange"}}

            className="moveBtn"
            onClick={() => this.selectType("random")}
          >
            Random
          </button>
        <button
            style={{ marginLeft: 0 , backgroundColor: "Red"}}
            className="moveBtn"
            onClick={() => this.selectType("tactical")}
          >
            Tactical AI
          </button>
          <button
            style={{ marginLeft: 200 , backgroundColor: "green"}}
            className="moveBtn"
            onClick={() => this.selectMode("bestOf3")}
          >
            Best Of 3
          </button>
          <button 
            style={{ marginLeft: "auto", backgroundColor: "blue"}}
            className="moveBtn"
            onClick={() => this.selectMode("bestOf5")}
          >
            Best Of 5
          </button>
        
        </div>
        <div className="round"> Rounds: {this.state.round} </div>
        <div class ="result">
          <div class ="playerMove">
          player:
            <div className={playerMove}>
            </div>
          <b>score :</b> {this.state.playerScore}
          </div>
          <div class="center"><b>Vs</b></div>
          <div class ="computerMove">
          {this.state.type} computer:
            <div className={computerMove}>
            </div>
            <b>score :</b> {this.state.computerScore}
          </div>
          
        </div>
        <div className="winner">Match Winner: {winner ? this.selectWinner() : null}</div>
        <div className="finalWin">Game Winner: {this.displayWinner() ?? null}</div>
       
        <div className="footer">
        <button
            class="column"
            className="moveBtn"
            onClick={() => this.selectMove("rock")}
          >
            rock
          </button>
          <button
            class="column"
            className="moveBtn"
            onClick={() => this.selectMove("paper")}
          >
            paper
          </button>
          <button
            class="column"          
            className="moveBtn"
            onClick={() => this.selectMove("scissors")}
          >
            scissor
          </button>
          <button 
        style={{ marginLeft: 400, marginTop:-50, backgroundColor: "Green"}} type="button" onClick={this.startGame}>
          Play!
        </button>
    </div>


      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
