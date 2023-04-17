'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  //Does this part call all the functions written above but in a certain order?
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    if (checkForWin()) {
      console.log('You won ya FOOL!')
      printStacks();
      process.exit();
    }
  }
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  //move selected token from old location to new location
  let piece = stacks[startStack].pop();
  stacks[endStack].push(piece);
}

// Before you move, should you check if the move is actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  //check if selected token is smaller than token it's being stacked on. If true then permissable. If false not permissable.
  let isStartStackValid = checkValidStack(startStack)
  let isEndStackValid = checkValidStack(endStack)
  if (!isStartStackValid || !isEndStackValid) {
    console.log('Please enter valid stack (a, b, or c) ya Fool!');
    return false;
  }

  let isValidOrder = checkValidOrder(startStack, endStack)
  if (  !isValidOrder  ) {
    return false;
  }

  return true;
}

//Code to check if stack inputs are permissable
const checkValidStack = (inputStack) => {
  const permissableStackInputs = ['a', 'b', 'c'];
  if (permissableStackInputs.includes(inputStack)) {
    return true;
  }
  else {
    return false;
  }
}

const checkValidOrder = (startStack, endStack) => {
  const startStackArray = stacks[startStack];
  const endStackArray = stacks[endStack];
  const lastStartPiece = startStackArray[startStackArray.length-1];
  const lastEndPiece = endStackArray[endStackArray.length-1] ;

  if (!lastStartPiece) {
    console.log('There is no piece there ya Fool!')
    return false;
  }
  else if (!lastEndPiece || (lastStartPiece < lastEndPiece)   ) {
    return true;
  }
  else {
    console.log('Please stack a smaller piece on the top. Ya Fool!');
    return false;
  } 
}


// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  //Win should occur if all tokens are stacked in sequential order from largest (bottom most token) to smallest (upper most token)
  //Win also requires all tokens be placed on the right most side (stack C)
  if (stacks.b.length === 4 || stacks.c.length === 4) {
    return true;
  }
  else {
    return false;
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
