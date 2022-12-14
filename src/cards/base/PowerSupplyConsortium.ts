import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {DecreaseAnyProduction} from '../../deferredActions/DecreaseAnyProduction';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class PowerSupplyConsortium extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.POWER_SUPPLY_CONSORTIUM,
      tags: [Tags.ENERGY],
      cost: 5,

      requirements: CardRequirements.builder((b) => b.tag(Tags.ENERGY, 2)),
      metadata: {
        cardNumber: '160',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().energy(1).any.br;
            pb.plus().energy(1);
          });
        }),
        description: 'Requires 2 Power tags. Decrease any Energy production 1 step and increase your own 1 step.',
      },
    });
  }

  public warning?: string;

  public canPlay(player: Player): boolean {
    this.warning = undefined;
    if (super.canPlay(player) && player.game.someoneElseHasResourceProduction(Resources.ENERGY, 1, player) === false) {
      this.warning = 'You will have to decrease your own energy production because no other player has enough.';
    }
    return player.getTagCount(Tags.ENERGY, false, true) >= 2;
  }

  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 1);
    player.game.defer(new DecreaseAnyProduction(player, Resources.ENERGY, 1));
    return undefined;
  }
}
