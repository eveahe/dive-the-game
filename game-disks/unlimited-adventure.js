const unlimitedAdventure = {
  roomId: 'diveIntro',
  inventory: [        
        { name: 'net', 
           //desc: 'This needs a description',
           use: ({disk, println, getRoom}) => {
            const room = getRoom(disk.roomId);
            if (room.id == 'gameStart') {
            println('There is nothing to capture here. Only darkness, and you can only bring back its memory.');
            return;
          }  else if (room.id == 'coralReef') {
            println('These fish are too fast for your terrestrial reflexes and disappear into the expanse. You do succeed in chipping off a large section of virgin coral. You have defaced something irreplaceable. Crumbs of prehistory slip through the holes in your net and drift slowly to an even deeper, unreachable place. You are left with only a sense of shame.');
            return;
              
          }  else {
             console.log(room.id)
          }
        }},
        { name: 'camera', 
         desc: 'This needs a description',
         use: ({disk, println, getRoom}) => {
            const room = getRoom(disk.roomId);
            if (room.id == 'gameStart') {
            println('need camera line');
            return;
          }  else if (room.id == 'coralReef') {
            println('need camera line');
            return;
              
          }  else {
             console.log(room.id)
          }
         }}
  ],
  rooms: [
    {
      name: 'DIVE!',
      id: 'diveIntro',
      img: `

      `,
      desc: `
Long has your heart and mind been held captive by the sea. At night for decades you have tossed and turned during sleepless nights, imagining the horror and wonder that man has yet to discover under the surface.

Finally, you have been given the opportunity to explore its depths in completely uncharted territory. For your dive, you take with you a net for specimen collection and a camera to document your discoveries. 

To begin, enter GO DIVE
      `
      // ,items: [
      //   { name: 'net', desc: 'This needs a description',isTakeable: true },
      //   { name: 'camera', desc: 'This needs a description', isTakeable: true }
      // ]
      ,
      exits: [
        { dir: 'dive', id: 'gameStart' }
      ]
    },
    {
      name: 'The Ocean Depths',
      id: 'gameStart',
      img: `
      `,
      desc: `
These are new and treacherous depths. The water is freezing even through your equipment, and it is difficult to see more 5 meters in front of you. Uncertainty lies in every direction, but you must start somewhere. Do you go East, West, North or South?
      `, 
      exits: [
        { dir: 'east', id: 'coralReef' },
        { dir: 'west', id: 'expanseWest' },
        { dir: 'north', id: 'expanseNorth' },
        { dir: 'south', id: 'coolRock' }
        
      ]
//       items: [
//         { name: 'key', desc: 'It looks like a key.', isTakeable: true, use: ({disk, println, getRoom}) => {
//           const room = getRoom(disk.roomId);
//           const door = room.items.find(item => item.name === 'door');
//           if (door) {
//             println('The door has opened!');
//             door.isOpen = true;
//           } else {
//             println('There\'s nothing to use the key on.');
//           }
//         }},
//         { name: 'book', desc: 'It appears to contain some sort of encantation, or perhaps... code.', isTakeable: true, use: ({disk, println, getRoom}) => {
//           const room = getRoom(disk.roomId);
//           const door = room.items.find(item => item.name === 'door');

//           if (door) {
//             println('You already used the book!');
//             return;
//           }

//           println('A door has appeared from nothing! It seems to go nowhere...');
//           room.items.push({ name: 'door', desc: 'It seems to go nowhere...', isOpen: false, use: ({disk, println, enterRoom}) => {
//             const door = room.items.find(item => item.name === 'door');
//             if (door.isOpen) {
//               enterRoom('gameReallyOver');
//             } else {
//               println('The door is locked.');
//             }
//           }});
//         }},
//         { name: 'castle', desc: 'It has been... corrupted somehow.' },
//       ]
    },
    {
      name: 'Coral Reef',
      id: 'coralReef',
      img: '',
      desc: `
        You approach a majestic reef made up of deep water coral. A school of luminous fish, forever untouched by the light of the sun and unseen by human eyes up until now, swim nimbly about its glorious spires.
      `,
      exits: [
        { dir: 'east', id: 'noExit' },
        { dir: 'west', id: 'gameStart' },
        { dir: 'north', id: 'incomprehensibleWhale' },
        { dir: 'south', id: 'plasticBottle' }
        
      ]
    },
    {
      name: 'Cool Rock',
      id: 'coolRock',
      img: '',
      desc: `
        You come across a rocky outcrop. Perched on top is an astoundingly cool rock. It’s difficult to describe what makes it so cool, but it is really ultra cool, you are certain of that.
        Do you take action here or go East, West, North or South?
      `,
      exits: [
        { dir: 'east', id: 'plasticBottle' },
        { dir: 'west', id: 'prehistoricKelpForest' },
        { dir: 'north', id: 'gameStart' },
        { dir: 'south', id: 'noExit' }
        
      ]
    },
  ],
};
