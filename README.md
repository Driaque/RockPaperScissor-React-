# RockPaperScissor-React-
A simple react application that imitates a regular Rock-Paper-Scissors game. 
The player gets to select the type of opponent to play (i.e, random computer or tactical computer) and the mode (i.e . Best of 3 or 5)

# Design Approach
Domain Driven Design

# Screen Shots:
<img src="https://user-images.githubusercontent.com/25950356/89760578-ad085c80-daba-11ea-8cea-b3eb5e31ccf9.png" >
<img src="https://user-images.githubusercontent.com/25950356/89760642-c9a49480-daba-11ea-9876-937807e773b6.png" >
<img src="https://user-images.githubusercontent.com/25950356/89760808-1d16e280-dabb-11ea-8be1-ca8476d84b43.png" >

# Actors
- Game
- Player
- Computer

# Models

# Player
+ move
_______________
+ play()

# Computer
+ Type
+ move
________________
+ playRandom()
+ playNextBest()

# Game
+ Player
+ Computer
+ round
+ Mode
+ type
+ finalWinner

________________

+ startGame()
+ selectMode(mode)
+ selectType(type)
+ selectWinner()
+ scoreWinner()
+ displayWinner()
+ selectMove(move)
+ checkRounds()
+ playRandom()
+ playTactical()
+ updatePlayerScore(score)
+ updateComputerScore(score)
+ updateNextBest()
+ selectnextbestmove()

# How to Run Application
To run the game download the source file;
- cd rock-paper-scissors/
- npm install(optional)
- npm start (to launch on Browser)


## Future Extensions
- Ability to add player's nickname
- record Score
- Add Player vs Player mode
