import Vue from 'vue';
import {SimpleGameModel} from '../models/SimpleGameModel';
import {Button} from '../components/common/Button';
import {playerColorClass} from '../utils/utils';
import {GameSetupDetail} from '../components/GameSetupDetail';

// taken from https://stackoverflow.com/a/46215202/83336
// The solution to copying to the clipboard in this case is
// 1. create a dummy input
// 2. add the copied text as a value
// 3. select the input
// 4. execute document.execCommand('copy') which does the clipboard thing
// 5. remove the dummy input
function copyToClipboard(text: string): void {
  const input = document.createElement('input');
  input.setAttribute('value', text);
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}
const DEFAULT_COPIED_PLAYER_ID = '-1';

export const GameHome = Vue.component('game-home', {
  props: {
    game: {
      type: Object as () => SimpleGameModel | undefined,
    },
  },
  components: {
    Button,
    'game-setup-detail': GameSetupDetail,
  },
  data: function() {
    return {
      // Variable to keep the state for the current copied player id. Used to display message of which button and which player playable link is currently in the clipboard
      urlCopiedPlayerId: DEFAULT_COPIED_PLAYER_ID as string,
    };
  },
  methods: {
    getGameId: function(): string {
      return this.game !== undefined ? this.game.id.toString() : 'n/a';
    },
    getTurnOrder: function(index: number): string {
      if (index === 0) {
        return '1st';
      } else if (index === 1) {
        return '2nd';
      } else if (index === 2) {
        return '3rd';
      } else if (index > 2) {
        return `${index + 1}th`;
      } else {
        return 'n/a';
      }
    },
    setCopiedIdToDefault: function() {
      this.urlCopiedPlayerId = DEFAULT_COPIED_PLAYER_ID;
    },
    getPlayerCubeColorClass: function(color: string): string {
      return playerColorClass(color.toLowerCase(), 'bg');
    },
    getHref: function(id: string): string {
      if (id[0] === 's') {
        return `/spectator?id=${id}`;
      }
      return `/player?id=${id}`;
    },
    copyUrl: function(playerId: string): void {
      copyToClipboard(window.location.origin + this.getHref(playerId));
      this.urlCopiedPlayerId = playerId;
    },
    isPlayerUrlCopied: function(playerId: string): boolean {
      return playerId === this.urlCopiedPlayerId;
    },
    getSpectatorId: function(): string {
      return this.game?.spectatorId ?? '';
    },
  },
  template: `
      <div id="game-home" class="game-home-container">
        <h1><span v-i18n>Terraforming mars</span> [game id: <span>{{getGameId()}}</span>]</h1>
        <h4 v-i18n>Instructions: To start the game, share this page with all the players or separately copy and share the links with each player. Click on your name to start the game. <br> The first time someone clicks on a link, they will receive a password. From then on, only the player with the password can access that player page.</h4>
        <ul>
          <li v-for="(player, index) in (game === undefined ? [] : game.players)">
            <span class="turn-order">{{getTurnOrder(index)}}</span>
            <span :class="'color-square ' + getPlayerCubeColorClass(player.color)"></span>
            <span class="player-name"><a :href="getHref(player.id)">{{player.name}}</a></span>
            <Button title="copy" size="tiny" :onClick="_=>copyUrl(player.id)"/>
            <span v-if="isPlayerUrlCopied(player.id)" class="copied-notice">Playable link for {{player.name}} copied to clipboard <span class="dismissed" @click="setCopiedIdToDefault" >dismiss</span></span>
          </li>

          <br>
          <li v-if="game !== undefined && game.spectatorId !== undefined">
            <span class="player-name"><a :href="getHref(getSpectatorId())">Spectator</a></span>
            <Button title="copy" size="tiny" :onClick="_=>copyUrl(getSpectatorId())"/>
            <span v-if="isPlayerUrlCopied(getSpectatorId())" class="copied-notice">Spectator link copied to clipboard <span class="dismissed" @click="setCopiedIdToDefault" >dismiss</span></span>
          </li>
        </ul>

        <div class="spacing-setup"></div>
        <div v-if="game !== undefined">
          <h1 v-i18n>Game settings</h1>
          <game-setup-detail :gameOptions="game.gameOptions" :playerNumber="game.players.length" :lastSoloGeneration="game.lastSoloGeneration" :inlineDisplay="false"></game-setup-detail>
        </div>
      </div>
    `,
});
