import React, { Component } from 'react';
import { deal, checkForKind, checkForRuns, isCombinedArrNewMeld, combineWholeBoard, checkArrForCard, isKindOrRun, getValueOfCard } from './CardFunctions';
import { Button } from 'react-bootstrap';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            playersHand: [],
            computersHand: [],
            deck: [],
            discard: [],
            selected: [],
            selectedDiscard: [],
            playersBoard: [],
            computersBoard: [],
            wholeBoard: []
        }
        this.putDownCardsPlayer = this.putDownCardsPlayer.bind(this);
        this.removeMeldsFromPlayerHand = this.removeMeldsFromPlayerHand.bind(this);
        this.deselectAllPlayerCards = this.deselectAllPlayerCards.bind(this);
        this.playerPickUpFromDeck = this.playerPickUpFromDeck.bind(this);
        this.playerDiscard = this.playerDiscard.bind(this);
        this.putMeldOnPlayersBoard = this.putMeldOnPlayersBoard.bind(this);
        this.updatePlayersBoard = this.updatePlayersBoard.bind(this);
        this.playerPickUpFromDiscard = this.playerPickUpFromDiscard.bind(this);
        this.selectDiscard = this.selectDiscard.bind(this);
        this.deselectAllDiscardCards = this.deselectAllDiscardCards.bind(this);
        this.checkHandForMeld = this.checkHandForMeld.bind(this);
        this.canPutDownExtras = this.canPutDownExtras.bind(this);
        this.addScores = this.addScores.bind(this);
    }

    componentDidMount() {
        let dealt = deal();
        this.setState({playersHand: dealt[0], computersHand: dealt[1], deck: dealt[2], discard: dealt[3]});
    }

    selectCards(id, card) {
        this.deselectAllDiscardCards();
        let elem = document.getElementById(id);
        let currentClasses = elem.className;
        let selectedCards = this.state.selected;
        if (currentClasses.slice(-10) === ' highlight') {
            elem.className = 'card'
            let index = selectedCards.indexOf(card);
            selectedCards.splice(index, 1);
        } else {
            elem.className = 'card highlight';
            selectedCards.push(card);
        }
        this.setState({selected: selectedCards});
    }

    putDownCardsPlayer() {
        let sets = checkForRuns(this.state.selected);
        let newMeld;
        if (sets.length) {
            if (sets[0].cards.length === this.state.selected.length) {
                // remove melds from hand and put them in meld
                newMeld = this.removeMeldsFromPlayerHand();
                newMeld.forEach(elem => {
                    elem.position = 'player';
                });
                this.deselectAllPlayerCards();
                // PUT NEW MELD ONTO PLAYERS & WHOLE BOARD!!!!
                this.putMeldOnPlayersBoard(newMeld);
                return;
            }
        } else {
            sets = checkForKind(this.state.selected);
            if (sets.length) {
                if (sets[0].cards.length === this.state.selected.length) {
                    // remove melds from hand and put them in meld
                    newMeld = this.removeMeldsFromPlayerHand();
                    newMeld.forEach(elem => {
                        elem.position = 'player';
                    });
                    this.deselectAllPlayerCards();
                    // PUT NEW MELD ONTO PLAYERS & WHOLE BOARD!!!!
                    this.putMeldOnPlayersBoard(newMeld);
                   return;
                }
            }
        }
        // NOW CHECK FOR EXTRAS TO ADD TO EXISTING MELDS!!
        if (this.canPutDownExtras()) {
            return;
        }
        // deselect and unhighlight all selected cards and alert the person that it wasn't a meld
         alert('These cards can not be placed on the board. Please only put on meld down at a time.');
         this.deselectAllPlayerCards();
    }

    deselectAllPlayerCards() {
        for (let i = 0; i < this.state.playersHand.length; i++) {
            document.getElementById(i.toString()).className = 'card';
            this.setState({selected: []});
        }
    }

    deselectAllDiscardCards() {
        for (let i = 0; i < this.state.discard.length; i++) {
            document.getElementById((i+100).toString()).className = 'card';
            this.setState({selectedDiscard: []});
        }
    }

    removeMeldsFromPlayerHand() {
        let selectedCards = this.state.selected.slice();
        let player = this.state.playersHand.slice();
        for (let i = 0; i < selectedCards.length; i++) {
            for (let j = 0; j < player.length; j++) {
                if (selectedCards[i].id === player[j].id) {
                    player.splice(j, 1);
                    break;
                }
            }
        }
        this.setState({playersHand: player});
        this.deselectAllPlayerCards();
        return selectedCards;
    }

    playerPickUpFromDeck() {
        if (this.state.deck.length) {
            let player = this.state.playersHand.slice();
            let deck = this.state.deck.slice();
            let card = deck[0];
            player.push(card);
            this.setState({playersHand: player, deck: deck.slice(1)});
        }
    }

    playerPickUpFromDiscard() {
        if (!this.state.selectedDiscard.length) {
            alert('You must select cards from the discard pile to pick them up.');
            return;
        }
        let player = this.state.playersHand.slice();
        let card = this.state.selectedDiscard[0];
        let discard = this.state.discard.slice();
        let length = this.state.selectedDiscard.length;
        if (this.checkHandForMeld(card, player)) {
            player = player.concat(this.state.selectedDiscard);
            this.setState({playersHand: player, discard: discard.slice(0, -length)});
            this.deselectAllDiscardCards();
        } else {
            alert('You must be able to use the card that you pick up from.');
        }
    }

    // Check if a card can be added to a hand and make a meld there. (Check if when you're picking up a card from discard, you can put it down)
    checkHandForMeld(card, hand) {
        // Check for kind
        let number = card.number;
        let id = card.id;
        let counter = 1;
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].number === number) {
                counter++;
            }
        }
        if (counter > 2) {
            return true;
        }
        // Check for runs
        let inner = [card];
        for (let j = 0; j < hand.length; j++) {
            if (hand[j].id > id-3 && hand[j].id < id+3) {
                inner.push(hand[j]);
            }
        }
        let sets = checkForRuns(inner);
        if (sets.length) {
            return true;
        }
        return false;
    }

    // Check if an array of one or two cards can be added to the player's board.
    canPutDownExtras() {
        let arr = this.state.selected.slice();
        let wholeBoard = this.state.wholeBoard.slice();
        let combined;
        let sets;
        let newBoard;
        for (let i = 0; i < wholeBoard.length; i++) {
            combined = wholeBoard[i].concat(arr);
            if (isKindOrRun(wholeBoard[i]) === 'run') {
                sets = checkForRuns(combined);
                if (sets[0].cards.length === combined.length) {
                    arr.forEach(elem => {
                        elem.position = 'player';
                    });
                    wholeBoard[i] = wholeBoard[i].concat(arr);
                    this.removeMeldsFromPlayerHand();
                    this.deselectAllPlayerCards();
                    newBoard = combineWholeBoard(wholeBoard);
                    this.setState({wholeBoard: newBoard});
                    this.updatePlayersBoard(newBoard);
                    return true;
                }
            }
        }
        for (let i = 0; i < wholeBoard.length; i++) {
            combined = wholeBoard[i].concat(arr);
            if (isKindOrRun(wholeBoard[i]) === 'kind') {
                sets = checkForKind(combined);
                if (sets[0].cards.length === combined.length) {
                    arr.forEach(elem => {
                        elem.position = 'player';
                    });
                    wholeBoard[i] = wholeBoard[i].concat(arr);
                    this.removeMeldsFromPlayerHand();
                    this.deselectAllPlayerCards();
                    this.setState({wholeBoard: wholeBoard});
                    this.updatePlayersBoard(wholeBoard);
                    return true;
                }
            }
        }
        return false;
    }


    playerDiscard() {
        if (this.state.selected.length === 1) {
            if (this.state.playersHand.length === 1) {
                this.addScores();
            }
            // CHECK IF THE PLAYER IS GOING OUT
            let card = this.state.selected[0];
            let player = this.state.playersHand.slice();
            let discard = this.state.discard.slice();
            discard.push(card);
            for (let i = 0; i < player.length; i++) {
                if (player[i].id === card.id) {
                    player.splice(i, 1);
                    break;
                }
            }
            this.setState({playersHand: player, discard: discard});
            this.deselectAllPlayerCards();
        } else if (this.state.selected.length === 0) {
            alert('You must select a card to discard');
        } else {
            alert('You may only discard one card.');
            this.deselectAllPlayerCards();
        }
    }

    putMeldOnPlayersBoard(newMeld) {
        let wholeBoard = this.state.wholeBoard.slice();
        wholeBoard.push(newMeld);
        let newBoard = combineWholeBoard(wholeBoard);
        this.updatePlayersBoard(newBoard);
    }

    updatePlayersBoard(wholeBoard) {
        let board = [];
        let inner;
        for (let i = 0; i < wholeBoard.length; i++) {
            inner = [];
            for (let j = 0; j < wholeBoard[i].length; j++) {
                if (wholeBoard[i][j].position === 'player') {
                    inner.push(wholeBoard[i][j]);
                }
            }
            board.push(inner);
        }
        this.setState({playersBoard: board, wholeBoard: wholeBoard});
    }

    selectDiscard(id) {
        this.deselectAllPlayerCards();
        this.deselectAllDiscardCards();
        let index = id - 100;
        let selectedCards = [];
        let discard = this.state.discard.slice()
        for (let i = index; i < discard.length; i++) {
            if (this.state.selectedDiscard.length) {
                if (this.state.selectedDiscard[0].id === discard[i].id) {
                    this.deselectAllDiscardCards();
                    return;
                }
            }
            document.getElementById((i+100).toString()).className = 'card highlight';
            selectedCards.push(discard[i]);
        }
        this.setState({selectedDiscard: selectedCards});
    }

    addScores() {
        let playerScore = 0;
        let computerScore = 0;
        for (let i = 0; i < this.state.wholeBoard.length; i++) {
            for (let j = 0; j < this.state.wholeBoard[i].length; j++) {
                if (this.state.wholeBoard[i][j].position === 'player') {
                    playerScore += getValueOfCard(this.state.wholeBoard[i][j]);
                } else {
                    computerScore += getValueOfCard(this.state.wholeBoard[i][j]);
                }
            }
        }
        if (playerScore > computerScore) {
            console.log(`Player Wins! Player has ${playerScore} points and computer has ${computerScore} points.`);
        } else if (playerScore === computerScore) {
            console.log(`It's a tie! Both players have ${playerScore} points.`);
        } else {
            console.log(`Computer wins. Computer has ${computerScore} points and player has ${playerScore} points.`);
        }
    }

    render() {
        console.log('STATE: ', this.state)
        return(
            <div>
                <div id='computer-cards' className='division'>
                    <div className='inner hand'>
                        {this.state.computersHand.length ? 
                            this.state.computersHand.map((card, index) => {
                                return (
                                    <img key={index} src={card.url} className='card'/>
                                )
                            })
                            : null}
                    </div>
                </div>
                <div id='computer-board' className='division'></div>
                <div id='pile-discard' className='division'>
                    <div className='inner'>
                        {this.state.deck.length ?
                            <img src='http://www.murphysmagicsupplies.com/images_email/Mandolin_BACK.jpg' className='card' id='pile' onClick={this.playerPickUpFromDeck} /> : null}
                        {this.state.discard.length ?
                            this.state.discard.map((card, index) => {
                                return (
                                    <img src={card.url} id={100+index} key={100+index} className='card discard' onClick={() => this.selectDiscard(100+index)} />
                            )}) : null}
                    </div>
                </div>
                <div id='player-board' className='division'>
                    {this.state.playersBoard.length ? 
                        this.state.playersBoard.map((elem, index) => {
                            return (
                                <div key={index} className='meld'>
                                    {elem.map((elem2, index2) => {
                                        return (
                                            <img key={index2} src={elem2.url} className='board-card'/>
                                        )
                                    })}
                                </div>
                            )
                        })
                        : null}
                </div>
                <div id='player-cards' className='division'>
                    <div className='inner hand'>
                        {this.state.playersHand.length ? 
                            this.state.playersHand.map((card, index) => {
                                return (
                                    <img id={index} key={index} src={card.url} className='card' onClick={() => this.selectCards(index, card)}/>
                                )
                            })
                            : null}
                    </div>
                        <div className='buttons'>
                            <Button className='button' bsSize='small' bsStyle='warning' onClick={this.putDownCardsPlayer}>Put Down Cards</Button>
                            <Button className='button' bsSize='small' bsStyle='warning' onClick={this.playerDiscard}>Discard</Button>
                            <Button bsSize='small' bsStyle='warning' onClick={this.playerPickUpFromDiscard}>Pick Up From Discard</Button>
                        </div>
                </div>
            </div>
        )
    }

}