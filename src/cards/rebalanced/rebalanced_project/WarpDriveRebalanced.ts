import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRequirements} from '../../CardRequirements';
import {Card} from '../../Card';

export class WarpDriveRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 16,
      tags: [Tags.SCIENCE],
      name: CardName.WARP_DRIVE_REBALANCED,
      cardType: CardType.ACTIVE,

      requirements: CardRequirements.builder((b) => b.tag(Tags.SCIENCE, 5)),
      cardDiscount: {tag: Tags.SPACE, amount: 4},
      metadata: {
        cardNumber: 'C49',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a Space card, you pay 4 M€ less for it.', (eb) => {
            eb.space().played.startEffect.megacredits(-4);
          });
        }),
        description: 'Requires 5 Science tags.',
        victoryPoints: 2,
      },
    });
  }

  public getCardDiscount(_player: Player, card: IProjectCard) {
    if (card.tags.includes(Tags.SPACE)) {
      return 4;
    }
    return 0;
  }

  public play() {
    return undefined;
  }

  public getVictoryPoints() {
    return 2;
  }
}
