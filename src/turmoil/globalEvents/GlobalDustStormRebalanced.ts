import {IGlobalEvent} from './IGlobalEvent';
import {GlobalEventName} from './GlobalEventName';
import {PartyName} from '../parties/PartyName';
import {Game} from '../../Game';
import {Resources} from '../../Resources';
import {Tags} from '../../cards/Tags';
import {Turmoil} from '../Turmoil';

export class GlobalDustStormRebalanced implements IGlobalEvent {
    public name = GlobalEventName.GLOBAL_DUST_STORM_REBALANCED;
    public description = 'Lose up to 5 heat. Lose 2 M€ for each Building tag (max 5, then reduced by influence).';
    public revealedDelegate = PartyName.KELVINISTS;
    public currentDelegate = PartyName.GREENS;
    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        if (player.heat > 0) {
          player.deductResource(Resources.HEAT, Math.min(player.heat, 5), {log: true, from: this.name});
        }
        const maxedSteelTags = Math.min(5, player.getTagCount(Tags.BUILDING, false, false));
        player.deductResource(Resources.MEGACREDITS, 2 * Math.max(0, maxedSteelTags - turmoil.getPlayerInfluence(player)), {log: true, from: this.name});
      });
    }
}
