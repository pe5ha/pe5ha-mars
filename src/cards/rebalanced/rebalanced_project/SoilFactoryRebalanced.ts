import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';

export class SoilFactoryRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.SOIL_FACTORY_REBALANCED,
      tags: [Tags.BUILDING],
      cost: 10,
      productionBox: Units.of({energy: -1, plants: 2}),

      metadata: {
        cardNumber: '179',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().energy(1).br;
            pb.plus().plants(2);
          });
        }),
        description: 'Decrease your Energy production 1 step and increase your Plant production 2 step.',
        victoryPoints: 1,
      },
    });
  }

  public canPlay(player: Player): boolean {
    return player.getProduction(Resources.ENERGY) >= 1;
  }

  public play(player: Player) {
    this.produce(player);
    return undefined;
  }

  public getVictoryPoints() {
    return 1;
  }

  public produce(player: Player) {
    player.addProduction(Resources.ENERGY, -1);
    player.addProduction(Resources.PLANTS, 2);
  }
}
