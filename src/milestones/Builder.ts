import {IMilestone} from './IMilestone';
import {Player} from '../Player';
import {Tags} from '../cards/Tags';

export class Builder implements IMilestone {
    public name: string = 'Builder';
    public description: string = 'Having at least 7 building tags in play'
    public getScore(player: Player): number {
      return player.getTagCount(Tags.BUILDING, false, true, true);
    }
    public canClaim(player: Player): boolean {
      return this.getScore(player) >= 7;
    }
}
