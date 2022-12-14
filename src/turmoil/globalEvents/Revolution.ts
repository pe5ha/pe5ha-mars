import {IGlobalEvent} from './IGlobalEvent';
import {GlobalEventName} from './GlobalEventName';
import {PartyName} from '../parties/PartyName';
import {Game} from '../../Game';
import {Turmoil} from '../Turmoil';
import {Tags} from '../../cards/Tags';
import {Player} from '../../Player';
import {LogHelper} from '../../LogHelper';

export class Revolution implements IGlobalEvent {
    public name = GlobalEventName.REVOLUTION;
    public description = 'Count Earth tags and ADD(!) influence. The player(s) with most (at least 1) loses 2 TR, and 2nd most (at least 1) loses 1 TR. SOLO: Lose 2 TR if the sum is 4 or more.';
    public revealedDelegate = PartyName.UNITY;
    public currentDelegate = PartyName.MARS;
    public resolve(game: Game, turmoil: Turmoil) {
      if (game.isSoloMode()) {
        const soloPlayer = game.getPlayers()[0];
        if (this.getScore(soloPlayer, turmoil) >= 4 ) {
          soloPlayer.decreaseTerraformRatingSteps(2);
          LogHelper.logGlobalEventTRDecrease(soloPlayer, 2);
        }
      } else {
        const players = [...game.getPlayers()].sort(
          (p1, p2) => this.getScore(p2, turmoil) - this.getScore(p1, turmoil),
        );

        // We have one rank 1 player
        if (this.getScore(players[0], turmoil) > this.getScore(players[1], turmoil)) {
          players[0].decreaseTerraformRatingSteps(2);
          LogHelper.logGlobalEventTRDecrease(players[0], 2);
          players.shift();

          if (players.length === 1 && this.getScore(players[0], turmoil) > 0) {
            players[0].decreaseTerraformRating();
            LogHelper.logGlobalEventTRDecrease(players[0], 1);
          } else if (players.length > 1) {
            // We have one rank 2 player
            if (this.getScore(players[0], turmoil) > this.getScore(players[1], turmoil)) {
              players[0].decreaseTerraformRating();
              LogHelper.logGlobalEventTRDecrease(players[0], 1);
              // We have at least two rank 2 players
            } else {
              const score = this.getScore(players[0], turmoil);
              while (players.length > 0 && this.getScore(players[0], turmoil) === score) {
                if (this.getScore(players[0], turmoil) > 0) {
                  players[0].decreaseTerraformRating();
                  LogHelper.logGlobalEventTRDecrease(players[0], 1);
                }
                players.shift();
              }
            }
          }
          // We have at least two rank 1 players
        } else {
          const score = this.getScore(players[0], turmoil);
          while (players.length > 0 && this.getScore(players[0], turmoil) === score) {
            if (this.getScore(players[0], turmoil) > 0) {
              players[0].decreaseTerraformRatingSteps(2);
              LogHelper.logGlobalEventTRDecrease(players[0], 2);
            }
            players.shift();
          }
        }
      }
    }
    public getScore(player: Player, turmoil: Turmoil) {
      return player.getTagCount(Tags.EARTH, false, false) + turmoil.getPlayerInfluence(player);
    }
}
