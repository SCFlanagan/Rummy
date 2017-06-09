import React, { Component } from 'react';
import { deal, checkForKind, checkForRuns, isCombinedArrNewMeld, combineWholeBoard, checkArrForCard, isKindOrRun, getValueOfCard, whichToPutDown, computerFindDiscard, computerShouldPickFromDiscard, cardCanGoOnBoard } from './CardFunctions';
import { Button } from 'react-bootstrap';
import DragSortableList from 'react-drag-sortable'
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
            scores: [],
            playerScore: 0,
            computerScore: 0,
            canPickUp: true,
            canPutDown: false,
            canDiscard:false,
            showInstructionsModal: false,
            notificationText: ''
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
        this.closeNotification = this.closeNotification.bind(this);
    }

    componentDidMount() {
        this.deal();
    }

    componentDidUpdate() {
        if (!this.state.playersHand.length || !this.state.computersHand.length) {
            this.addScores();
        }
    }

    deal() {
        let dealt = deal();
        this.setState({playersHand: dealt[0], computersHand: dealt[1], deck: dealt[2], discard: dealt[3], wholeBoard: [], playersBoard: [], computersBoard: [], winText: '', canPickUp: true, canPutDown: false, canDiscard: false});
    }

    playerPickUpFromDeck() {
        if (this.state.canPutDown) {
            this.setState({notificationText: 'You already picked up. You may add cards to the board or discard.'});
        }
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
        if (this.state.canPutDown) {
            this.setState({notificationText: 'You already picked up. You may add cards to the board or discard.'});
        }
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
        if (this.state.canPickUp) {
            this.setState({notificationText: 'You must pick up before you can add to the board.'});
            return;
        }
        if (this.state.canPutDown) {
            let elem = document.getElementById(id + 'x');
            let currentClasses = elem.className;
            let selectedCards = this.state.selected;
            if (currentClasses.length === 23) {
                let index = selectedCards.indexOf(card);
                selectedCards.splice(index, 1);
            } else {
                selectedCards.push(card);
            }
            this.setState({selected: selectedCards});
        }
    }

    deselectAllPlayerCards() {
        for (let i = 0; i < this.state.playersHand.length; i++) {
            this.setState({selected: []});
        }
    }

    putDownCardsPlayer() {
        if (this.state.canPutDown) {
            if (!this.state.selected.length) {
                this.setState({notificationText: 'Please select cards to put down.'});
                return;
            }
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
            this.setState({notificationText: 'These cards can not be placed on the board. Please create or add to just one meld down at a time.'});
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
                        let newBoard = combineWholeBoard(wholeBoard);
                        newBoard = combineWholeBoard(newBoard);
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
                        let newBoard2 = combineWholeBoard(wholeBoard);
                        newBoard2 = combineWholeBoard(newBoard2);
                        this.setState({wholeBoard: newBoard2});
                        this.updatePlayersBoard(newBoard2);
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
                this.setState({notificationText: 'You must select a card to discard'});
            } else {
                this.setState({notificationText: 'You may only discard one card.'});
                this.deselectAllPlayerCards();
            }
        }
    }

    putMeldOnPlayersBoard(newMeld) {
        let wholeBoard = this.state.wholeBoard.slice();
        wholeBoard.push(newMeld);
        wholeBoard = combineWholeBoard(wholeBoard);
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
            if (inner.length) {
                board.push(inner);
            }
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
                this.computerPickUpFromDeck();
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
        for (let i = 0; i < cardsToPutDown.length; i++) {
            this.removeMeldFromComputerHand(cardsToPutDown[i]);
            let wholeBoard = this.state.wholeBoard.slice();
            wholeBoard.push(cardsToPutDown[i]);
            let newBoard = combineWholeBoard(wholeBoard);
            this.updateComputersBoard(newBoard);
            if (!this.state.computersHand.length) {
                this.addScores();
            }
        }
    }

    computerPutDownExtras() {
        let hand = this.state.computersHand.slice();
        let board = this.state.wholeBoard.slice();
        for (let i = 0; i < 2; i++) {
            for (let j = hand.length-1; j >= 0; j--) {
                let onBoard = cardCanGoOnBoard(hand[j], board);
                if (onBoard !== false) {
                    let card = hand[j];
                    card.position = 'computer';
                    board[onBoard].push(card);
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
        let scoreArr = [];
        let scores = this.state.scores.slice();
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
        let playerTotal = playerScore - subtractPlayer;
        let computerTotal = computerScore - subtractComputer;
        scoreArr.push(playerTotal);
        scoreArr.push(computerTotal);
        scores.push(scoreArr);
        if (!playersHand.length) {
            playersHand = [0];
        } else if (!computersHand.length) {
            computersHand = [0];
        }

        if (playerTotal > computerTotal) {
            this.setState({scores: scores, playerScore: playerTotal, computerScore: computerTotal, winText: `You win! You have ${playerTotal} points and the computer has ${computerTotal} points.`, playersHand: playersHand, computersHand: computersHand});
        } else if (playerTotal === computerTotal) {
            this.setState({scores: scores, playerScore: playerTotal, computerScore: computerTotal, winText:`It's a tie! You both have ${playerTotal} points.`, playersHand: playersHand, computersHand: computersHand});
        } else {
            this.setState({scores: scores, playerScore: playerTotal, computerScore: computerTotal, winText: `Computer wins. Computer has ${computerTotal} points and you have ${playerTotal} points.`, playersHand: playersHand, computersHand: computersHand});
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
            if (inner.length) { 
                board.push(inner);
            }
        }
        this.setState({computersBoard: board, wholeBoard: wholeBoard});
    }

    showInstructions() {
        this.setState({showInstructionsModal: true});
    }

    closeNotification() {
        this.setState({notificationText: ''});
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
        let playerTotalScore = 0;
        let computerTotalScore = 0;
        for (let j = 0; j < this.state.scores.length; j++) {
            playerTotalScore += this.state.scores[j][0];
            computerTotalScore += this.state.scores[j][1];
        }
        console.log('STATE: ', this.state)
        return(
            <div className='board'>
                <div className='outer-hand'>
                    <div className='inner'>
                        {(this.state.computersHand.length && this.state.computersHand[0] !== 0) ? 
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
                <div className='outer-board'>
                    <div className='inner'>
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
                </div>
                <div className='outer'>
                    <div className='inner'>
                        {this.state.deck.length ?
                            <img src='http://www.murphysmagicsupplies.com/images_email/Mandolin_BACK.jpg' className='card' id='pile' onClick={this.playerPickUpFromDeck} /> : <img className='card border' id='empty-pile' onClick={this.flipOverDeck}/>}
                        {this.state.discard.length ?
                            <img 
                                src={this.state.discard[0].url} 
                                className='card'  
                                onClick={this.playerPickUpFromDiscard}/>
                        : <img className='card border'/>}
                    </div>
                </div>
                <div className='outer-board'>
                    <div className='inner'>
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
                </div>
                <div className='outer-hand'>
                    <div className='inner'>
                        <DragSortableList items={list} onSort={this.onSort} type="horizontal"/>
                    </div>
                </div>
                <br></br>
                <div className='outer' id='buttons'>
                    <div className='inner'>
                        <Button className='button' bsSize='small' bsStyle='warning' onClick={this.sortPlayersHand}>Sort by Number</Button>
                        <Button className='button' bsSize='small' bsStyle='warning' onClick={this.putDownCardsPlayer}>Add Cards To Board</Button>
                        <Button className='button' bsSize='small' bsStyle='warning' onClick={this.playerDiscard}>Discard</Button>
                        <InstructionsButton id='question-mark' />
                    </div>
                </div>
                {this.state.notificationText.length ? 
                    <div id='notification-modal' className='modal inner'>
                        <h4>{this.state.notificationText}</h4>
                        <Button bsSize='small' bsStyle='warning' onClick={this.closeNotification} className='ok-btn'>Ok</Button>
                    </div>
                    : null}
                {this.state.winText.length ? 
                        <div className='inner modal'>
                            <h4>{this.state.winText}</h4>
                            <table className='score-table'>
                                <thead>
                                    <tr>
                                        <th>You</th>
                                        <th className='left'>Computer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.scores.map((elem, index) =>{
                                        return (
                                            <tr key={index}>
                                                {elem.map((elem2, index2) => {
                                                    let type = '';
                                                    if (index2 === 1) {
                                                        type = 'top';
                                                    } else {
                                                        type = 'top-right';
                                                    }
                                                    return (
                                                        <td key={index2} className={type}>     {elem2}</td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                    {(this.state.scores.length > 1) ?
                                    <tr>
                                        <td className='bold bold-top-right'>{playerTotalScore}</td>
                                        <td className='bold bold-top'>{computerTotalScore}</td>
                                    </tr>
                                    : null}
                                </tbody>
                            </table>
                            <Button bsSize='small' bsStyle='warning' onClick={this.deal}className='ok-btn'>Play Again</Button>
                        </div>
                    
                    : null}
            </div>
        )
    }
}




// Fix instructions modal

// Big space when you get a notification



// Can Wait:

// Improve computer player: Keep track of what cards are available? Change the whichToPutDown function so it favors melds that are worth more (favors face and aces kinds and runs otherwise)?

// Better card pictures