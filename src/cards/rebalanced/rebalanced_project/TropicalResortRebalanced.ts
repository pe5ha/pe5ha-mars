import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';

export class TropicalResortRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.TROPICAL_RESORT_REBALANCED,
      tags: [Tags.BUILDING],
      cost: 11,
      productionBox: Units.of({megacredits: 3, heat: -2}),

      metadata: {
        cardNumber: '098',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) =>{
            pb.minus().heat(2).br;
            pb.plus().megacredits(3);
          });
        }),
        description: 'Reduce your heat production 2 steps and increase your M€ production 3 steps.',
        victoryPoints: 2,
      },
    });
  }
  public canPlay(player: Player): boolean {
    return player.getProduction(Resources.HEAT) >= 2;
  }
  public play(player: Player) {
    player.addProduction(Resources.HEAT, -2);
    player.addProduction(Resources.MEGACREDITS, 3);
    return undefined;
  }
  public getVictoryPoints() {
    return 2;
  }
}
