// import {Player} from './Player';
// import {Game} from './Game';
// import fetch from 'node-fetch';


// function sendGameResults(game: Game){
  
//   let content = {
//       gameId: game.id,
//       playersNumber: game.getPlayers().length,
//       generation: game.generation,
//       gameOptions: game.gameOptions,
//       // scores:

//     };
//   let scriptURL = 'https://script.google.com/macros/s/AKfycbxqMfEYwiwluWYhj74TRanCJL88hyhdAEbBARhIcTAPGzLCaENgz8LNuAD_S0Y8UQlWyg/exec';
//   fetch(scriptURL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(content)
//   });
// }
  