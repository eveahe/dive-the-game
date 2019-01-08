const loadDisk = (disk, config = {}) => {
  // build default (DOM) configuration
  const defaults = {
    // retrieve user input
    getInput: () => document.querySelector('#input').value,
    // overwrite user input
    setInput: (str) => {
      document.querySelector('#input').value = str;
    },
    // render output
    println: (str, isImg = false) => {
      const output = document.querySelector('#output');
      const newLine = document.createElement('div');

      if (isImg) {
        newLine.classList.add('img');
      }

      output.appendChild(newLine).innerText = str;
      output.scrollTop = output.scrollHeight;
    },
    // prepare the environment
    setup: ({applyInput = (() => {}), navigateHistory = (() => {})}) => {
      const inputBox = document.querySelector('#input');
      inputBox.onkeypress = (e) => {
        const ENTER = 13;

        if (e.keyCode === ENTER) {
          applyInput();
        }
      };

      inputBox.onkeydown = (e) => {
        const UP = 38;
        const DOWN = 40;

        if (e.keyCode === UP) {
          navigateHistory('prev');
        } else if (e.keyCode === DOWN) {
          navigateHistory('next');
        }
      };
    }
  };

  const {getInput, setInput, println, setup} = Object.assign(defaults, config);

  // Disk -> Disk
  const init = (disk) => {
    const initializedDisk = Object.assign({}, disk);
    initializedDisk.rooms = disk.rooms.map((room) => {
      room.visits = 0;
      return room;
    });

    return initializedDisk;
  };

  disk = init(disk);

  const inputs = ['']; // store all user commands
  let inputsPos = 0;

  // String -> Room
  const getRoom = (id) => disk.rooms.find(room => room.id === id);

  const enterRoom = (id) => {
    const room = getRoom(id);

    println(room.img, true);

    println(`---${room.name}---`);

    if (room.visits === 0) {
      println(room.desc);
    }
    //Tracking visits to the room.
    room.visits++;

    disk.roomId = id;
  };

  const startGame = (disk) => {
    enterRoom(disk.roomId);
  };

  startGame(disk);

  const applyInput = () => {
    const input = getInput();
    inputs.push(input);
    inputsPos = inputs.length;
    println('> ' + input);

    const val = input.toLowerCase();
    setInput(''); // reset input field

    const exec = (cmd) => {
      if (cmd) {
        cmd();
      } else {
        println('Sorry, I didn\'t understand your input. For a list of available commands, type HELP.');
      }
    };

    const args = val.split(' ');
    const cmd = args[0];
    const room = getRoom(disk.roomId);

    // nested strategy pattern
    // 1st tier based on # of args in user input
    // 2nd tier based on 1st arg (command)
    const strategy = {
      1() {
        const cmds = {
          inv() {
            if (!disk.inventory.length) {
              println('You don\'t have any items in your inventory.')
              return;
            } else {
              println('You have the following items in your inventory:');
              disk.inventory.forEach(item => {
                println(`* ${item.name}`);
              })
              if(disk.numPhotos.length){
                println(`* ${disk.numPhotos.length} photo(s)`);
              }}                     
          },
          look() {
            println(room.desc);
          },
          go() {
            const exits = room.exits;
            if (!exits) {
              println('There\'s nowhere to go.');
              return;
            }
            println('Where would you like to go? Available directions are:');
            exits.forEach(exit => println(exit.dir));
          },
          //Added this command, ending the game through surfacing.
          surface(){
            println('You have completed your dive. To show for it you have:');
            if (disk.inventory.length){
                disk.inventory.forEach(item => {
                println(`* ${item.name}`);
              })
              if(disk.numPhotos.length){
                println(`* ${disk.numPhotos.length} photo(s)`);
            }}
            println('The truly know the sea is impossible and you remain in the dark, but these are a start.');
            setTimeout(function(){
                document.getElementById('output').innerHTML = "To dive again type Go Dive.";
            }, 6000);
          },
          // For dive the game I added the instruction word for "surface." You can add any instructions you want, you just need to add it also to const cmds list that follows and define what that command does.
          help() {
            const instructions = `
              The following commands are available:
              LOOK :: repeat room description
              LOOK AT [OBJECT NAME] e.g. 'look at key'
              TAKE [OBJECT NAME] e.g. 'take book'
              GO [DIRECTION] e.g. 'go north'
              USE [OBJECT NAME] e.g. 'use door'
              INV :: list inventory items
              HELP :: this help menu
              SURFACE return to the surface and end your dive
            `;
            println(instructions);
          },
        };
        exec(cmds[cmd]);
      },
      //This is the list of commands that take two words as an argument.
      2() {
        const cmds = {
          look() {
            println(`You look ${args[1]}.`);
          },
          go() {
            const exits = room.exits;
            if (!exits) {
              println('There\'s nowhere to go.');
              return;
            }
            const nextRoom = exits.find(exit => exit.dir === args[1]);
            if (!nextRoom) {
              println('You dare not go any further. That would be beyond the scope of your expedition.');
            } else {
              enterRoom(nextRoom.id);
            }
          },
          take() {
            const findItem = item => item.name === args[1];
            const itemIndex = room.items && room.items.findIndex(findItem);
            if (typeof itemIndex === 'number' && itemIndex > -1) {
              const item = room.items[itemIndex];
              if (item.isTakeable) {
                disk.inventory.push(item);
                room.items.splice(itemIndex, 1);
                println(`You took the ${item.name}.`);
              } else {
                println('You can\'t take that.');
              }
            } else {
              println('You don\'t see any such thing.');
            }
          },
          use() {
            const findItem = item => item.name === args[1];
            const item = (room.items && room.items.find(findItem)) || disk.inventory.find(findItem);

            if (item) {
              if (item.use) {
                const use = typeof item.use === 'string' ? eval(item.use) : item.use;
                use({disk, println, getRoom, enterRoom}); // use item and give it a reference to the game
              } else {
                println('That item doesn\'t have a use.');
              }
            } else {
              println('You don\'t have that.');
            }
          }
        };
        exec(cmds[cmd]);
      },
       //This is the list of commands that take two words as an argument.
      3() {
        const cmds = {
          look() {
            const findItem = item => item.name === args[2];
            const item = (room.items && room.items.find(findItem)) || disk.inventory.find(findItem);
            if (!item) {
              println('You don\'t see any such thing.');
            } else {
              println(item.desc);
            }
          },
        };
        exec(cmds[cmd]);
      }
    };

    strategy[args.length]();
  };

  const navigateHistory = (dir) => {
    if (dir === 'prev') {
      inputsPos--;
      if (inputsPos < 0) {
        inputsPos = 0;
      }
    } else if (dir === 'next') {
      inputsPos++;
      if (inputsPos > inputs.length) {
        inputsPos = inputs.length;
      }
    }

    setInput(inputs[inputsPos] || '');
  };

  setup({applyInput, navigateHistory});
};

// npm support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = loadDisk;
}
