import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class WinModal extends Component {
  constructor() {
      super();
      this.newGame = this.newGame.bind(this);
  }

  newGame() {
      window.location.reload();
  }

  render() {
    return (
      <Modal
        show={true}
        container={this}
        aria-labelledby="contained-modal-title"
        bsSize="sm"
        className='modal'
      >
        <Modal.Body>
          <h4 className='modal-text'>{this.props.winText}</h4>
          <Button bsSize='small' bsStyle='warning' onClick={this.newGame}>New Game</Button>
        </Modal.Body>
      </Modal>
    )
  }
}
