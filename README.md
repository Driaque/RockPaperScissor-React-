# RockPaperScissor-React-
A simple react application that imitates a regular Rock-Paper-Scissors game. 
The player gets to select the type of opponent to play (i.e, random computer or tactical computer) and the mode (i.e . Best of 3 or 5)

# Design Approach
Domain Driven Design

# Screen Shots:


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

## Future Extensions
- Ability to add player's nickname
- record Score
- Add Player vs Player mode
