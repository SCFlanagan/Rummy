import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class Instructions extends Component {
  constructor(props) {
    super();
    this.state = {
      showModal: props.showModal
    }
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  render() {
    return (
      <div>
        <Button bsStyle="warning" bsSize="large" onClick={this.open} id='question-mark'>?</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Rules</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Object of the Game</h3>
            <p>Each player tries to form matched sets consisting of groups of three or four of a kind, or sequences of three or more cards of the same suit.</p>
            <h3>The Play</h3>
            <p>Beginning with the player to the left of the dealer, players either draw the top card of the stock or take the top card of the discard pile and adds it to their hand. The player may also lay down on the table, face up, any meld (matched set). If the player does not wish to lay down a meld, they discard one card, face up, onto the discard pile. If the player has drawn from the discard pile, they may not discard the same card on that turn.</p>
            <h3>Laying off</h3>
            <p>A player may add one or more from their hand to any matched set already shown on the table. Thus, if threes are showing, they may add the fourth three; if 10, 9, 8 are showing, they may add J, or Q, J, 7, or 7, 6.</p>
            <h3>Going out</h3>
            <p>When a player gets rid of all their cards, they win the game. The player must discard on their last turn.</p>
            <p>If all his remaining cards are matched, the player may lay them down without discarding on his last turn. This ends the game and there is no further play.</p>
            <h3>How to Keep Score</h3>
            <p>Each player pays to the winner the pip value of the cards remaining in his hand, whether the cards form matched sets or not. Face cards count 10 each, aces 1 each, and every other card its pip value.</p> 
          </Modal.Body>
          <Modal.Footer>
            <Button bsSize='small' bsStyle='warning' onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
/*



import React, { Component } from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

const InstructionModal = (props) => {  
  return (
    <Modal bsSize="large" id='instructions-modal'>
      <Modal.Header closeButton>
        <h2>Rummy Rules</h2>
      </Modal.Header>
      <Modal.Body>
        <h3>Object of the Game</h3>
        <p>Each player tries to form matched sets consisting of groups of three or four of a kind, or sequences of three or more cards of the same suit.</p>
        <h3>The Play</h3>
        <p>Beginning with the player to the left of the dealer, players either draw the top card of the stock or take the top card of the discard pile and adds it to their hand. The player may also lay down on the table, face up, any meld (matched set). If the player does not wish to lay down a meld, they discard one card, face up, onto the discard pile. If the player has drawn from the discard pile, they may not discard the same card on that turn.</p>
        <h3>Laying off</h3>
        <p>A player may add one or more from their hand to any matched set already shown on the table. Thus, if threes are showing, they may add the fourth three; if 10, 9, 8 are showing, they may add J, or Q, J, 7, or 7, 6.</p>
        <h3>Going out</h3>
        <p>When a player gets rid of all their cards, they win the game. The player must discard on their last turn.</p>
        <p>If all his remaining cards are matched, the player may lay them down without discarding on his last turn. This ends the game and there is no further play.</p>
        <h3>How to Keep Score</h3>
        <p>Each player pays to the winner the pip value of the cards remaining in his hand, whether the cards form matched sets or not. Face cards count 10 each, aces 1 each, and every other card its pip value.</p>    
        <Button bsSize='small' bsStyle='warning' onClick={props.onHide}>Ok</Button>
      </Modal.Body>
    </Modal>
  )
}

class InstructionButton extends Component {
  constructor(){
    super()
    this.state = {show: false}
  }

  render(){
    let lgClose = () => this.setState({show: false})
    return (
      <div id='question-mark'>
        <h1 onClick={() => this.setState({ show: true })}>?</h1>
        <InstructionModal show={this.state.show} onHide={lgClose} />
      </div>
    )
  }
}

export default InstructionButton */