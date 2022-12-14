import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {ISpace} from '../../../boards/ISpace';
import {TileType} from '../../../TileType';
import {CardName} from '../../../CardName';
import {Resources} from '../../../Resources';
import {Priority} from '../../../deferredActions/DeferredAction';
import {GainResources} from '../../../deferredActions/GainResources';
import {CardRequirements} from '../../CardRequirements';
import {CardRenderer} from '../../render/CardRenderer';

export class ArcticAlgaeRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.ARCTIC_ALGAE_REBALANCED,
      tags: [Tags.PLANT],
      cost: 12,

      requirements: CardRequirements.builder((b) => b.oceans(2)),
      metadata: {
        description: 'Requires 2 ocean tiles. Gain 1 plant.',
        cardNumber: '023',
        renderData: CardRenderer.builder((b) => {
          b.effect('When anyone places an ocean tile, gain 2 plants.', (be) => be.oceans(1).any.startEffect.plants(2)).br;
          b.plants(1);
        }),
      },
    });
  }

  public onTilePlaced(cardOwner: Player, activePlayer: Player, space: ISpace) {
    if (space.tile?.tileType === TileType.OCEAN) {
      cardOwner.game.defer(
        new GainResources(cardOwner, Resources.PLANTS, {
          count: 2,
          cb: () => activePlayer.game.log(
            '${0} gained 2 ${1} from ${2}',
            (b) => b.player(cardOwner).string(Resources.PLANTS).cardName(this.name)),
        }),
        cardOwner.id !== activePlayer.id ? Priority.OPPONENT_TRIGGER : undefined,
      );
    }
  }

  public play(player: Player) {
    player.plants++;
    return undefined;
  }
}
