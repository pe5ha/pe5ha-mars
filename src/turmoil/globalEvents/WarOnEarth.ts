import {IGlobalEvent} from './IGlobalEvent';
import {GlobalEventName} from './GlobalEventName';
import {PartyName} from '../parties/PartyName';
import {Game} from '../../Game';
import {Turmoil} from '../Turmoil';
import {LogHelper} from '../../LogHelper';

export class WarOnEarth implements IGlobalEvent {
    public name = GlobalEventName.WAR_ON_EARTH;
    public description = 'Reduce TR 4 steps. Each influence prevents 1 step.';
    public revealedDelegate = PartyName.MARS;
    public currentDelegate = PartyName.KELVINISTS;
    public resolve(game: Game, turmoil: Turmoil) {
      game.getPlayers().forEach((player) => {
        const steps = Math.max(0, 4 - turmoil.getPlayerInfluence(player));
        player.decreaseTerraformRatingSteps(steps);
        LogHelper.logGlobalEventTRDecrease(player, steps);
      });
    }
}
