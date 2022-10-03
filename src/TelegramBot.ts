import {Player} from './Player';
import {Game} from './Game';
import fetch from 'node-fetch';

// sending notice about player turns via telegram bot
export function sendTelegramNotice(player: Player) {
  if (!player.telegramID) return;
  if (player.lastNoticeMessageId!==-1) deleteTelegramNotice(player);
  const chat_id = player.telegramID;
  const notice = ', your turn! 🪐';
  const text = player.name + notice;
  const message = sendMessage(chat_id, text);
  message.then(function(data) {
    if (data.result.message_id) player.lastNoticeMessageId = data.result.message_id;
    console.log(player.name+': lastNoticeMessageId = '+player.lastNoticeMessageId);

    player.game.save(); // specially to save `player.lastNoticeMessageId` for pretty telegram notices >:)
  });
}

export function deleteTelegramNotice(player: Player) {
  if (!player.telegramID) return;
  if (player.lastNoticeMessageId===-1) return;
  const chat_id = player.telegramID;
  const message_id = player.lastNoticeMessageId;
  deleteMessage(chat_id, message_id);
  player.lastNoticeMessageId = -1;
}

// sending notice about game start
export function sendTelegramNoticeGameStart(player: Player) {
  if (!player.telegramID) return;
  const chat_id = player.telegramID;
  const notice = ', new game start! 🚀 Your link: '+process.env.HOST+'/player?id='+player.id;
  const text = player.name + notice;
  sendMessage(chat_id, text);
}

export function sendGameResultsInTelegramChats(game: Game) {
  let text = '';
  game.getPlayers().forEach((player)=>{
    text+=player.getVictoryPoints().total+' '+player.name+'%0A';
    sendMessage(player.telegramID, player.name+', the game is over.');
  });

  const chat_id = process.env.BOT_GROUP_CHAT_ID;
  sendMessage(chat_id, text);
}

async function sendMessage(chat_id: String|undefined, text: String|undefined) {
  const token = process.env.BOT_TOKEN;
  if (token) {
    const queryString = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chat_id + '&text=' + text;
    const url = encodeURI(queryString);
    console.log(queryString);
    try {
      return (await fetch(url)).json();
    } catch (e) {
      console.log(e);
    }
  }
  return null;
}

function deleteMessage(chat_id: String|undefined, message_id: number|undefined) {
  const token = process.env.BOT_TOKEN;
  if (token) {
    const queryString = 'https://api.telegram.org/bot' + token + '/deleteMessage?chat_id=' + chat_id + '&message_id=' + message_id;
    const url = encodeURI(queryString);
    console.log(queryString);
    try {
      fetch(url);
    } catch (e) {
      console.log(e);
    }
  }
}
