const cardUrls = ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Ace_of_hearts.svg/2000px-Ace_of_hearts.svg.png', 'https://ih1.redbubble.net/image.105654733.1458/flat,800x800,075,f.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW3jNVERAbvhjzB9vre2TeAHOyfh0grIvP5MEnoqZzJNFVvfdV6g', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/4_of_hearts.svg/2000px-4_of_hearts.svg.png','https://s3-us-west-2.amazonaws.com/files.queenoftarot.com/production/tarot_cards/images/000/000/914/thumb/4-5.png?1469803892', 'http://img.geocaching.com/cache/145fa822-617c-432f-a7ae-0f8d29b9bbbc.jpg', 'https://songofmyself.wikispaces.com/file/view/heart-7.png/151886675/heart-7.png', 'http://sandiego.informermg.com/files/2012/02/Eight-of-hearts.jpg', 'http://media.istockphoto.com/photos/playing-card-nine-of-hearts-picture-id166087097?k=6&m=166087097&s=612x612&w=0&h=IOFEnc8Y1JnWVhsDkiU7orx2AtmgyG91HvGyEFrEc0g='];
const cardUrls2 = ['http://media.istockphoto.com/photos/playing-card-ten-of-hearts-picture-id166087315', 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Poker-sm-224-Jh.png', 'http://www.conradaskland.com/blog/wp-content/uploads/2007/05/queen-hearts1.png', 'https://blogblowfish.files.wordpress.com/2015/08/4863851-king-of-hearts-playing-card.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Ace_of_diamonds.svg/2000px-Ace_of_diamonds.svg.png', 'http://spiritualnutrition.org/wp-content/uploads/2011/07/200px-Playing_card_diamond_2.svg_.png', 'http://spiritualnutrition.org/wp-content/uploads/2011/08/3Diamonds.png', 'https://ih1.redbubble.net/image.117912159.1017/flat,800x800,075,f.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Playing_card_diamond_5.svg/614px-Playing_card_diamond_5.svg.png', 'http://2.bp.blogspot.com/_wG8RymXSv5U/THiYADJ_AtI/AAAAAAAAAKA/Rt4XgSFmcMI/s1600/200px-Playing_card_diamond_6_svg.png'];
const cardUrls3 = ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Playing_card_diamond_7.svg/2000px-Playing_card_diamond_7.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_8.svg/2000px-Playing_card_diamond_8.svg.png', 'http://spiritualnutrition.org/wp-content/uploads/2011/07/Diamonds-9.png', 'http://spiritualnutrition.org/wp-content/uploads/2011/08/10-of-Diamonds.jpg', 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Poker-sm-234-Jd.png', 'https://upload.wikimedia.org/wikipedia/commons/7/70/Poker-sm-233-Qd.png', 'http://spiritualnutrition.org/wp-content/uploads/2011/07/king_of_diamonds1.jpg', 'https://s-media-cache-ak0.pinimg.com/originals/e8/43/a9/e843a9c5d6def7736a2eef943242fa93.png', 'http://res.freestockphotos.biz/pictures/15/15497-illustration-of-a-two-of-spades-playing-card-pv.png', 'https://s-media-cache-ak0.pinimg.com/736x/cb/ff/b2/cbffb2276dc1187ce624f35de1c2a42b.jpg'];
const cardUrls4 = ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Playing_card_spade_4.svg/819px-Playing_card_spade_4.svg.png', 'http://3.bp.blogspot.com/_wG8RymXSv5U/TIMJxLIBbyI/AAAAAAAAAKw/LR3LT8YFA1g/s1600/200px-Playing_card_spade_5_svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Playing_card_spade_6.svg/819px-Playing_card_spade_6.svg.png', 'http://spiritualnutrition.org/wp-content/uploads/2012/01/200px-Playing_card_spade_7.svg_.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Playing_card_spade_8.svg/2000px-Playing_card_spade_8.svg.png', 'https://allaboutcards.files.wordpress.com/2009/08/9ofspades2.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Playing_card_spade_10.svg/2000px-Playing_card_spade_10.svg.png', 'https://allaboutcards.files.wordpress.com/2009/06/jack-spades.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Poker-sm-213-Qs.png/170px-Poker-sm-213-Qs.png'];
const cardUrls5 = ['https://s-media-cache-ak0.pinimg.com/736x/e7/fc/fc/e7fcfc21f98f2f179d420a8b2a8122b6.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Playing_card_club_A.svg/2000px-Playing_card_club_A.svg.png', 'http://spiritualnutrition.org/wp-content/uploads/2011/07/2-of-clubs-card.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Playing_card_club_3.svg/819px-Playing_card_club_3.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Playing_card_club_4.svg/819px-Playing_card_club_4.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_club_5.svg/200px-Playing_card_club_5.svg.png', 'http://3.bp.blogspot.com/_wG8RymXSv5U/THCdp0sFIzI/AAAAAAAAAJo/Q6Vba9iK-mo/s1600/200px-Playing_card_club_6_svg.png', 'http://spiritualnutrition.org/wp-content/uploads/2011/08/Seven-of-Clubs.png', 'http://spiritualnutrition.org/wp-content/uploads/2011/06/260495_195310213849966_110750432305945_506459_2875753_n1-216x300.jpg'];
const cardUrls6 = ['http://lasvegas.informermg.com/files/2012/05/Nine-of-Clubs.jpg', 'http://spiritualnutrition.org/wp-content/uploads/2011/07/273012_206111359436518_110750432305945_542405_7935589_o.jpg', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Poker-sm-244-Jc.png', 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Poker-sm-243-Qc.png', 'https://upload.wikimedia.org/wikipedia/commons/2/25/Poker-sm-242-Kc.png'];

let combinedCardUrls = cardUrls.concat(cardUrls2).concat(cardUrls3).concat(cardUrls4).concat(cardUrls5).concat(cardUrls6);

let deck = [];
let playersHand = [];
let computersHand = [];
let discard = [];
let numberOfMelds = 0;

// Creates a card object.
function Card(id, number, suit, url) {
  this.id = id;
  this.number = number;
  this.suit = suit;
  this.url = url;
  this.getValue = () => {
    if (this.number === 1) {
      return 15;
    } else if (this.number > 9) {
      return 10;
    } else {
      return 5;
    }
  };
}

function createDeck() {
  const suits = ['h', 'd', 's', 'c'];
  let index = 0;
  let cards = [];
  let card;
  let id = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 14; j++) {
      card = new Card(id, j, suits[i], combinedCardUrls[index]);
      cards.push(card);
      id++;
      index++;
    }
  }
  return cards;
}

function shuffle() {
  const array = createDeck();
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  } 
  return array;
}

export const deal = () => {
  deck = shuffle();
  let card;
  for (let i = 0; i < 20; i++) {
    card = deck.shift();
    if (i % 2 === 0) {
      playersHand.push(card);
    } else {
      computersHand.push(card);
    }
  }
  discard.push(deck.shift());
  computersHand.sort((a, b) => {return a.value - b.value});
  return [playersHand, computersHand, deck, discard];
}

export const checkForRuns = (arr) => {
  arr.sort((a,b) => a.id - b.id);
  let inner;
  let lastValue;
  let sets = [];
  let obj;
  let lastInner;
  for (let i = 0; i < arr.length; i++) {
    inner = [arr[i]];
    for (let j = i+1; j < arr.length; j++) {
      lastInner = inner[inner.length-1];
      if (arr[j].id - 1 === lastInner.id && arr[j].suit === lastInner.suit) {
        inner.push(arr[j]);
      } else {
        break;
      }
    }
    if (inner.length > 2) {
      obj = {};
      obj.cards = inner;
      obj.value = getValueOfSet(inner);
      obj.type = 'run';
      obj.suit = inner[0].suit;
      sets.push(obj);
      i += inner.length-1;
    }
  }
  return sets;
}

export const checkForKind = (arr) => {
  arr.sort((a,b) => a.number - b.number);
  let inner;
  let lastValue;
  let sets = [];
  let lastInner;
  let obj;
  for (let i = 0; i < arr.length; i++) {
    inner = [arr[i]];
    for (let j = i+1; j < arr.length; j++) {
      lastInner = inner[inner.length-1];
      if (arr[j].number === lastInner.number) {
        inner.push(arr[j]);
      } else {
        break;
      }
    }
    if (inner.length > 2) {
      obj = {};
      obj.cards = inner;
      obj.value = getValueOfSet(inner);
      obj.type = 'kind';
      obj.meldId = numberOfMelds;
      sets.push(obj);
      i += inner.length-1;
    }
  }
  return sets;
}

export const getValueOfSet = (sets) => {
  let value = 0;
  for (let i = 0; i < sets.length; i++) {
    value += sets[i].getValue();
  }
  return value;
}

// Combines an array of cards with an existing meld and checks to see if the combination of the two creates a bigger meld than was present in either alone.
export const isCombinedArrNewMeld = (arr, meld) => {
    let combined = arr.concat(meld);
    let arrType = isKindOrRun(arr);
    let meldType = isKindOrRun(meld);
    let sets;
    if (arrType === meldType) {
        if (arrType === 'run') {
            sets = checkForRuns(combined);
            if (sets[0].cards.length > arr.length) {
                return sets[0].cards;
            }
        } else {
            sets = checkForKind(combined);
            if (sets[0].cards.length > arr.length) {
                return sets[0].cards;
            }
        }
    }
    return false;
}

export const combineWholeBoard = (wholeBoard) => {
    // Combine all kind melds
    let combined = [];
    let otherMelds = [];
    for (let i = 0; i < wholeBoard.length; i++) {
        if (isKindOrRun(wholeBoard[i]) === 'run') {
            combined = combined.concat(wholeBoard[i]);
        } else {
            otherMelds.push(wholeBoard[i]);
        }
    }
    let sets = checkForRuns(combined);
    for (let j = 0; j < sets.length; j++) {
        otherMelds.push(sets[j].cards);
    }
    return otherMelds;
}

export const isKindOrRun = (arr) => {
    let sets = checkForRuns(arr);
    let type;
    if (sets.length) {
        return 'run';
    } else {
        return 'kind';
    }
}

export const isSameMeld = (arr, meld) => {
    if (arr.length === meld.length) {
        for (let i = 0; i < arr.length; i++) {
            let counter = 0;
            for (let j = 0; j < meld.length; j++) {
                if (arr[i].id === meld[j].id) {
                    counter++
                }
            }
            if (counter > 1) {
                return true;
            }
        }
    }
    return false;
}

export const checkArrForCard = (card, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === card.id) {
      return true;
    }
  }
  return false;
}

export const getValueOfCard = (card) => {
    if (card.number < 11) {
        return card.number;
    } else {
        return 10;
    }
}

export const whichToPutDown = (arr) => {
  let kinds = checkForKind(arr);
  let runs = checkForRuns(arr);
  let orderedSets = orderSets(runs, kinds);
  let sets = removeDuplicates(orderedSets);
  return sets;
}

function orderSets(arr1, arr2) {
  let sets = [];
  for (let i = 0; i < arr1.length; i++) {
    sets.push(arr1[i]);
  }
  for (let j = 0; j < arr2.length; j++) {
    sets.push(arr2[j]);
  }
  return sets.sort((a,b) => b.value - a.value);
}

function removeDuplicates(sets) {
  let card;
  sets.sort((a,b) => b.value - a.value);
  for (let i = 0; i < sets.length; i++) {
    for (let j = 0; j < sets[i].cards.length; j++) {
      card = sets[i].cards[j];
      for (let k = i+1; k < sets.length; k++) {
        for (let l = 0; l < sets[k].cards.length; l++) {
          if (card.id === sets[k].cards[l].id) {
            sets.splice(k, 1);
            break;
          }
        }
      }
    }
  }
  return sets
}

export const computerShouldPickFromDiscard = (card, hand, board) => {
    // Pick up if it can go on the board.
    if (cardCanGoOnBoard(card, board)) return true;
    // Add the card to hand.
    let newHand = hand.concat(card);
    // If the card creates a meld, return true.
    let sets = checkForRuns(newHand);
    if (sets.length) {
        if (checkArrForCard(card, sets[0].cards)) {
            return true;
        }
    } else {
        sets= checkForKind(newHand);
        if (sets.length) {
            if (checkArrForCard(card, sets[0].cards)) {
                return true;
            }
        }
    }
    // If not, see if it is part of a pair or a run.
    let partOfPair = findPair(card, hand);
    if (partOfPair) {
        if (partOfPair >= 2) return true;
        // If the numbers are higher than 6 or if the computer has less than 5 cards left
        if (card.number > 7 || hand.length < 5) {
        // See if the card you would discard would be the one given card.
            let discard = computerFindDiscard(newHand);
            if (discard.id === card.id) {
            return false;
            } else {
            return true;
            }
        }
    } else {
        return false;
    }
}

export const findPair = (card, hand) => {
    let newHand = hand.slice();
    newHand.sort((a,b) => {
        return a.id - b.id;
    });
    let counter = 0;
    for (let i = 0; i < newHand.length; i++) {
        if (newHand[i].id - 1 === card.id) {
        counter++;
        } else if (newHand[i].id + 1 === card.id) {
        counter++;
        }
    }
    for (let j = 0; j < newHand.length; j++) {
        if (newHand[j].number === card.number) {
        counter++;
        }
    }
    return {counter: counter, card: card};
  }

export const computerFindDiscard = (hand) => {
      let counters = [];
      for (let i = 0; i < hand.length; i++) {
          let combined = hand.slice(0,i).concat(hand.slice(i+1));
          counters.push(findPair(hand[i], combined));
      }
      counters.sort((a,b) => {
          return a.counter - b.counter;
      });
      let least = counters[0].counter;
      let leastCards = [];
      counters.forEach(elem => {
          if (elem.counter === least) {
          leastCards.push(elem.card);
          }
      });
      leastCards.sort((a,b) => {
          return a.number - b.number;
      });
      return leastCards[0];
  }

export const cardCanGoOnBoard = (card, board) => {
  let copy = board.slice();
  let combined;
  let sets;
  for (let i = 0; i < board.length; i++) {
    combined = [card].concat(board[i]);
    if (isKindOrRun(combined) === 'run') {
      sets = checkForRuns(combined)[0];
      if (sets.cards.length === combined.length) {
        return true;
      }
    } 
  }
  for (let j = 0; j < board.length; j++) {
    if (isKindOrRun(board[j]) === 'kind') {
      if (board[j][0].number === card.number) {
        return true;
      }
    } 
  }
  return false;
} 