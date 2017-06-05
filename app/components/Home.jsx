import React, { Component } from 'react';
import { deal, checkForKind, checkForRuns, isCombinedArrNewMeld, combineWholeBoard, checkArrForCard, isKindOrRun, getValueOfCard, whichToPutDown, computerFindDiscard, computerShouldPickFromDiscard, cardCanGoOnBoard } from './CardFunctions';
import { Button } from 'react-bootstrap';
import DragSortableList from 'react-drag-sortable'
import WinModal from './WinModal';
import InstructionsButton from './InstructionsModal';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            playersHand: [],
            computersHand: [],
            deck: [],
            discard: [],
            selected: [],
            playersBoard: [],
            computersBoard: [],
            wholeBoard: [],
            winText: '',
            canPickUp: true,
            canPutDown: false,
            canDiscard:false,
            showInstructionsModal: false
        }
        this.playerPickUpFromDeck = this.playerPickUpFromDeck.bind(this);
        this.playerPickUpFromDiscard = this.playerPickUpFromDiscard.bind(this);
        this.selectCards = this.selectCards.bind(this);
        this.deselectAllPlayerCards = this.deselectAllPlayerCards.bind(this);
        this.putDownCardsPlayer = this.putDownCardsPlayer.bind(this);
        this.removeMeldsFromPlayerHand = this.removeMeldsFromPlayerHand.bind(this);
        this.playerDiscard = this.playerDiscard.bind(this);
        this.putMeldOnPlayersBoard = this.putMeldOnPlayersBoard.bind(this);
        this.updatePlayersBoard = this.updatePlayersBoard.bind(this);
        this.canPutDownExtras = this.canPutDownExtras.bind(this);
        this.addScores = this.addScores.bind(this);
        this.computerTurn = this.computerTurn.bind(this);
        this.computerPickUpFromDeck = this.computerPickUpFromDeck.bind(this);
        this.computerPutDownCards = this.computerPutDownCards.bind(this);
        this.removeMeldFromComputerHand = this.removeMeldFromComputerHand.bind(this);
        this.updateComputersBoard = this.updateComputersBoard.bind(this);
        this.computerPutDownExtras = this.computerPutDownExtras.bind(this);
        this.computerDiscard = this.computerDiscard.bind(this);
        this.onSort = this.onSort.bind(this);
        this.sortPlayersHand = this.sortPlayersHand.bind(this);
        this.computerPickUpFromDiscard = this.computerPickUpFromDiscard.bind(this);
        this.computerDiscard = this.computerDiscard.bind(this);
        this.flipOverDeck = this.flipOverDeck.bind(this);
        this.showInstructions = this.showInstructions.bind(this);
        this.deal = this.deal.bind(this);
    }

    componentDidMount() {
        this.deal();
    }

    deal() {
        let dealt = deal();
        this.setState({playersHand: dealt[0], computersHand: dealt[1], deck: dealt[2], discard: dealt[3], playersBoard: [], computersBoard: []});
    }

    playerPickUpFromDeck() {
        if (this.state.canPickUp) {
            if (this.state.deck.length) {
                let player = this.state.playersHand.slice();
                let deck = this.state.deck.slice();
                let card = deck[0];
                player.push(card);
                this.setState({playersHand: player, deck: deck.slice(1), canPickUp: false, canPutDown: true, canDiscard: true});
            }
        }
    }

    playerPickUpFromDiscard() {
        if (this.state.canPickUp) {
            let discard = this.state.discard.slice();
            let player = this.state.playersHand.slice();
            let card = discard[0];
            player.push(card);
            this.setState({playersHand: player, discard: discard.slice(1), canPickUp: false, canPutDown: true, canDiscard: true});
        }
    }

    // The highlight class isn't working. The border isn't showing up on the cards.
    selectCards(id, card) {
        if (this.state.canPutDown) {
            let elem = document.getElementById(id + 'x');
            let currentClasses = elem.className;
            let selectedCards = this.state.selected;
            console.log('currentClasses:', currentClasses.length)
            if (currentClasses.length === 23) {
                let index = selectedCards.indexOf(card);
                selectedCards.splice(index, 1);
            } else {
                selectedCards.push(card);
            }
            this.setState({selected: selectedCards});
        }
        console.log('selected', this.state.selected)
    }

    deselectAllPlayerCards() {
        for (let i = 0; i < this.state.playersHand.length; i++) {
            this.setState({selected: []});
        }
    }

    putDownCardsPlayer() {
        if (this.state.canPutDown) {
            let sets = checkForRuns(this.state.selected);
            let newMeld;
            // Add new melds.
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
            // Add extras to existing melds.
            if (this.canPutDownExtras()) {
                return;
            }
            // You can not put the selected cards on the board.
            alert('These cards can not be placed on the board. Please only put on meld down at a time.');
            this.deselectAllPlayerCards();
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

    // Checks if an array of one or two cards can be added to the player's board.
    canPutDownExtras() {
        if (this.state.canPutDown) {
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
    }

    playerDiscard() {
        if (this.state.canDiscard) {
            let discard = this.state.discard.slice();
            let card;
            if (this.state.selected.length === 1) {
                // Check if the player is going out.
                if (this.state.playersHand.length === 1) {
                    this.addScores();
                    card = this.state.playersHand[0];
                    discard.unshift(card);
                    this.setState({playersHand: [], discard: discard})
                    return;
                }
                card = this.state.selected[0];
                let player = this.state.playersHand.slice();
                discard.unshift(card);
                for (let i = 0; i < player.length; i++) {
                    if (player[i].id === card.id) {
                        player.splice(i, 1);
                        break;
                    }
                }
                this.setState({playersHand: player, discard: discard, canPutDown: false, canDiscard: false});
                this.deselectAllPlayerCards();
                this.computerTurn();
            } else if (this.state.selected.length === 0) {
                alert('You must select a card to discard');
            } else {
                alert('You may only discard one card.');
                this.deselectAllPlayerCards();
            }
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

    onSort(e) {
        let hand = [];
        for (let i = 0; i < e.length; i++) {
            hand.push(e[i].card);
        }
        this.setState({playersHand: hand});
    }

    sortPlayersHand() {
        let player = this.state.playersHand.slice();
        player.sort((a,b) => {
            return a.number - b.number;
        });
        this.setState({playersHand: player});
    }

    flipOverDeck() {
        let pile = this.state.discard.slice();
        let discardCard = [pile[0]];
        pile = pile.slice(1);
        pile.reverse();
        this.setState({deck: pile, discard: discardCard});
    }

    


    




    // COMPUTER:

    computerTurn() {
        // See if you can discard
        // Pick up
        setTimeout(() => {
            let bool = computerShouldPickFromDiscard(this.state.discard[0], this.state.computersHand, this.state.wholeBoard);
            if (bool === true) {
                this.computerPickUpFromDiscard();
            } else {
                this.computerPickUpFromDeck();
            }
        }, 1000);
        // Put down melds
        setTimeout(() => {
            let computer = this.state.computersHand.slice();
            let sets = whichToPutDown(computer);
            if (sets.length) {
                this.computerPutDownCards(sets);
            }
        }, 2000);
        // Put down extras
        setTimeout(() => {
            this.computerPutDownExtras();
        }, 2500);
        // Discard
        setTimeout(() => {
            this.computerDiscard();
        }, 3000);
    }

    computerPickUpFromDeck() {
        if (this.state.deck.length) {
            let computer = this.state.computersHand.slice();
            let deck = this.state.deck.slice();
            let card = deck[0];
            computer.push(card);
            this.setState({computersHand: computer, deck: deck.slice(1)});
        } else {
            if (this.state.discard.length > 1) {
                this.flipOverDeck();
                computerPickUpFromDeck();
            }
        }
    }

    computerPickUpFromDiscard() {
        let discard = this.state.discard.slice();
        let computer = this.state.computersHand.slice();
        let card = discard[0];
        computer.push(card);
        this.setState({computersHand: computer, discard: discard.slice(1)});
    }

    computerPutDownCards(sets) {
        let cardsToPutDown = [];
        let value = sets.length
        if (sets.length) {
            for (let x = 0; x < sets.length; x++) {
                cardsToPutDown.push(sets[x].cards);
            }
        }
        let total = 0;
        cardsToPutDown.forEach(elem => {
            elem.forEach(elem2 => {
                elem2.position = 'computer';
                total++;
            });
        });
        if (total >= this.state.computersHand.length) {
            return;
        }
        for (let i = 0; i < cardsToPutDown.length; i++) {
            this.removeMeldFromComputerHand(cardsToPutDown[i]);
            let wholeBoard = this.state.wholeBoard.slice();
            wholeBoard.push(cardsToPutDown[i]);
            let newBoard = combineWholeBoard(wholeBoard);
            this.updateComputersBoard(newBoard);
        }
    }

    computerPutDownExtras() {
        console.log('in');
        let hand = this.state.computersHand.slice();
        let board = this.state.wholeBoard.slice();
        for (let i = 0; i < 2; i++) {
            for (let j = hand.length-1; j >= 0; j--) {
                let onBoard = cardCanGoOnBoard(hand[j], board);
                if (onBoard && hand.length > 1) {
                    let card = hand[j];
                    card.position = 'computer';
                    board[onBoard].push(card);
                    console.log(card);
                    hand.splice(j, 1);
                }
            }
        }
        this.setState({computersHand: hand, wholeBoard: board});
        this.updateComputersBoard(board);
    }

    computerDiscard() {
        let computer = this.state.computersHand.slice();
        let discard = this.state.discard.slice();
        let winner = false;
        if (computer.length === 1) {
            winner = true;
        }
        let card = computerFindDiscard(computer);
        for (let i = 0; i < computer.length; i++) {
            if (computer[i].id === card.id) {
                computer.splice(i, 1);
                break;
            }
        }
        discard.unshift(card);
        this.setState({computersHand: computer, discard: discard, canPickUp: true});
        if (winner) {
            this.addScores();
        }
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
        let playersHand = this.state.playersHand.slice();
        let computersHand = this.state.computersHand.slice();
        let subtractPlayer = 0;
        let subtractComputer = 0;
        for (let k = 0; k < playersHand.length; k++) {
            subtractPlayer += playersHand[k].getValue();
        }
        for (let l = 0; l < computersHand.length; l++) {
            subtractComputer += computersHand[l].getValue();
        }
        let playerFinal = playerScore - subtractPlayer;
        let computerFinal = computerScore - subtractComputer;


        if (playerFinal > computerFinal) {
            this.setState({winText: `You Win! You have ${playerFinal} points and the computer has ${computerFinal} points.`});
        } else if (playerScore === computerScore) {
            this.setState({winText:`It's a tie! You both have ${playerFinal} points.`});
        } else {
            this.setState({winText: `Computer wins. Computer has ${computerFinal} points and you have ${playerFinal} points.`});
        }
    }

    removeMeldFromComputerHand(meld) {
        let computer = this.state.computersHand.slice();
        for (let i = 0; i < meld.length; i++) {
            for (let j = 0; j < computer.length; j++) {
                if (meld[i].id === computer[j].id) {
                    computer.splice(j, 1);
                    break;
                }
            }
        }
        this.setState({computersHand: computer});
        return meld;
    }

    updateComputersBoard(wholeBoard) {
        let board = [];
        let inner;
        for (let i = 0; i < wholeBoard.length; i++) {
            inner = [];
            for (let j = 0; j < wholeBoard[i].length; j++) {
                if (wholeBoard[i][j].position === 'computer') {
                    inner.push(wholeBoard[i][j]);
                }
            }
            board.push(inner);
        }
        this.setState({computersBoard: board, wholeBoard: wholeBoard});
    }

    showInstructions() {
        this.setState({showInstructionsModal: true});
    }

    render() {
        let list = [];
        if (this.state.playersHand.length) {
            this.state.playersHand.map((card, index) => {
                let obj = {};
                let divClassName = undefined;
                for (let i = 0; i < this.state.selected.length; i++) {
                    if (this.state.selected[i].id === card.id) {
                        divClassName = 'card-outline-hightlight';
                        break;
                    }
                }
                if (divClassName === undefined) {
                    divClassName = 'card-outline';
                }
                obj.card = card;
                obj.content = (
                    <div id={`${index}x`} className={divClassName}>
                        <img 
                            id={index} 
                            key={index} 
                            src={card.url} 
                            className='card player-card'
                            onClick={() => this.selectCards(index, card)} 
                        />
                    </div>
                );
                list.push(obj);
            })
        }
        console.log('STATE: ', this.state)
        return(
            <div className='board'>
                <div id='computer-cards' className='division'>
                    <div className='inner hand'>
                        {this.state.computersHand.length ? 
                            this.state.computersHand.map((card, index) => {
                                return (
                                    <img 
                                        key={index} 
                                        src={'http://www.murphysmagicsupplies.com/images_email/Mandolin_BACK.jpg'} 
                                        className='card computer-card'/>
                                )
                            })
                            : null}
                    </div>
                </div>
                <div id='computer-board' className='division'>
                    {this.state.computersBoard.length ? 
                        this.state.computersBoard.map((elem, index) => {
                            return (
                                <div key={index} className='meld'>
                                    {elem.map((elem2, index2) => {
                                        return (
                                            <img 
                                                key={index2} 
                                                src={elem2.url} 
                                                className='board-card'/>
                                        )
                                    })}
                                </div>
                            )
                        })
                        : null}
                </div>
                <div id='pile-discard' className='division'>
                    <div className='inner'>
                        {this.state.deck.length ?
                            <img src='http://www.murphysmagicsupplies.com/images_email/Mandolin_BACK.jpg' className='card' id='pile' onClick={this.playerPickUpFromDeck} /> : <img className='card border' onClick={this.flipOverDeck}/>}
                        {this.state.discard.length ?
                            <img 
                                src={this.state.discard[0].url} 
                                className='card discard'  
                                onClick={this.playerPickUpFromDiscard}/>
                        : null}
                    </div>
                </div>
                <div id='player-board' className='division'>
                    {this.state.playersBoard.length ? 
                        this.state.playersBoard.map((elem, index) => {
                            return (
                                <div key={index} className='meld'>
                                    {elem.map((elem2, index2) => {
                                        return (
                                            <img 
                                                key={index2} 
                                                src={elem2.url} className='board-card'/>
                                        )
                                    })}
                                </div>
                            )
                        })
                        : null}
                </div>
                <div id='player-cards' className='division'>
                    <div className='inner hand'>
                        <DragSortableList items={list} onSort={this.onSort} type="horizontal"/>
                    </div>
                </div>
                <div className='buttons'>
                    <Button className='first-btn button' bsSize='small' bsStyle='warning' onClick={this.sortPlayersHand}>Sort</Button>
                    <Button className='button' bsSize='small' bsStyle='warning' onClick={this.putDownCardsPlayer}>Put Down Cards</Button>
                    <Button className='button' bsSize='small' bsStyle='warning' onClick={this.playerDiscard}>Discard</Button>
                    <InstructionsButton id='question-mark' />
                </div>
                {this.state.winText.length ? <WinModal winText={this.state.winText} /> : null}
            </div>
        )
    }

}




// Change the whichToPutDown function so it favors meldss that are worth more (favors face and aces kinds and runs otherwise)

// Don't keep pairs if there is not possibility of three of a kind (i.e. there are two others on the board already)

// Don't pick up if you aren't going to have enough cards to discard and can't put a meld down.

// Make it so the win modal doesn't refresh the page, just deals again and keeps track of your score so you can play multiple rounds

// Original rules said you could go out without discarding