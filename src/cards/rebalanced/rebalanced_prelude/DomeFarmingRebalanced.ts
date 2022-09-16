import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';

export class DomeFarmingRebalanced extends PreludeCard {
  constructor() {
    super({
      name: CardName.DOME_FARMING_REBALANCED,
      tags: [Tags.PLANT, Tags.BUILDING],
      productionBox: Units.of({megacredits: 3, plants: 1}),

      metadata: {
        cardNumber: 'P07',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(3).plants(1));
        }),
        description: 'Increase your M€ production 3 steps and plant production 1 step.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.PLANTS, 1);
    player.addProduction(Resources.MEGACREDITS, 3);
    return undefined;
  }
}

