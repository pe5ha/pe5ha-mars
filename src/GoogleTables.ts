import {Player} from './Player';
import {Game} from './Game';
import fetch from 'node-fetch';

// sending notice about player turns via telegram bot
export function sendTurnNotice(player: Player) {
  if (!player.telegramID) return;
  const content = {
    gameId: player.game.id,
    chat_id: player.telegramID,
    player_name: player.name,
    type: 'TURN',
  };
  sendGASrequest(content);
}

// sending notice about player turns via telegram bot
export function deleteTurnNotice(player: Player) {
  if (!player.telegramID) return;
  const content = {
    gameId: player.game.id,
    chat_id: player.telegramID,
    type: 'TURN_COMPLETE',
  };
  sendGASrequest(content);
}

// sending notice about game start
export function sendNoticeGameStart(player: Player) {
  if (!player.telegramID) return;
  const notice = ', new game start! 🚀 Your link: '+process.env.HOST+'/player?id='+player.id;
  const text = player.name + notice;
  const content = {
    gameId: player.game.id,
    chat_id: player.telegramID,
    type: 'GAME_START',
    text: text,
  };
  sendGASrequest(content);
}

export function sendGameResults(game: Game) {
  let text = '';
  game.getPlayers().forEach((player)=>{
    text+=player.getVictoryPoints().total+' '+player.name+'\n';
  });
  const content = {
    gameId: game.id,
    playersNumber: game.getPlayers().length,
    generation: game.generation,
    gameOptions: game.gameOptions,
    // scores:
    type: 'GAME_END',
    text: text,
  };
  sendGASrequest(content);
}

function sendGASrequest(content: any) {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxqMfEYwiwluWYhj74TRanCJL88hyhdAEbBARhIcTAPGzLCaENgz8LNuAD_S0Y8UQlWyg/exec';
  fetch(scriptURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(content),
  });
}
