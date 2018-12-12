## dive the game
![Demo Screenshot](https://cdn.glitch.com/1bfa9f3a-3a61-4172-afe0-6ba07c2f7c67%2FScreen%20Shot%202018-12-05%20at%209.57.44%20PM.png?1544045041602 "Demo Screenshot")

## The Game
Explore the unknown depths of the deep ocean and the creatures that lurk there. The game was a collaboration between Robert Norman + Eve Ahearn, confronting eve's fear of the deep ocean. 

## !!!Spoilers for those who want to see how it works!!!
![Game Map](https://cdn.glitch.com/1bfa9f3a-3a61-4172-afe0-6ba07c2f7c67%2Fgame_map.JPG?1544565088938)

The game is made of nine rooms, traversable through cardinal directions. At the beginning of the game you are given two objects, a net and a camera. You can use each to interact with what you find in deep ocean, though they might not always work as expected. 

The purpose of the game is open-ended and when your discovery is complete is up to you the player to define.

You can exit the game voluntarily at any point through through the command "Surface."

#### What is it?
A JavaScript REPL-style text-based adventure game engine, based on the [text-engine](https://github.com/okaybenji/text-engine) library, available on [npm](https://www.npmjs.com/package/text-engine) too -- see [text-engine-node](https://github.com/okaybenji/text-engine-node) for further info.

Text-engine has been adapted for the purposes of this specific game.

#### How do I use it?
Do you want to make your own game? Do it! Further directions in the [text-engine](https://github.com/okaybenji/text-engine) repo but here's a quick recap:
* Remix this glitch app. 
* `text-engine` uses a disk metaphor for the data which represents your game, like the floppy disks of yore. Including `index.js` from this repository in your `index.html` `<script>`s adds a single function to the global namespace: `loadDisk`. `loadDisk` accepts a single argument, which is your disk -- a standard JavaScript object (JSON).
* Map a map for your game and decide what the rooms, items and exits that are relevant -- and how players can move between the rooms. 
* If you want to add or edit the player commands, review the action list in `index.js` file.

### Built by 
RZN + EA. 

### Acknowledgments
* Built off of [Text Engine](https://github.com/okaybenji/text-engine), thank you [Benji Kay](http://benjikay.com/)!
* Apple ][ font by Zeb downloaded from [dafont.com](http://www.dafont.com/apple.font).

