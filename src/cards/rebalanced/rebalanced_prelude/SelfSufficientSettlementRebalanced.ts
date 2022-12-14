import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {PreludeCard} from '../../prelude/PreludeCard';
import {IProjectCard} from '../../IProjectCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {PlaceCityTile} from '../../../deferredActions/PlaceCityTile';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';

export class SelfSufficientSettlementRebalanced extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.SELF_SUFFICIENT_SETTLEMENT_REBALANCED,
      tags: [Tags.BUILDING, Tags.CITY],
      productionBox: Units.of({megacredits: 2}),

      metadata: {
        cardNumber: 'P29',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2)).megacredits(3).br.city();
        }),
        description: 'Increase your money production 2 steps. Gain 3 MC. Place a City tile.',
      },
    });
  }
  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, 2);
    player.megaCredits += 3;
    player.game.defer(new PlaceCityTile(player));
    return undefined;
  }
}
