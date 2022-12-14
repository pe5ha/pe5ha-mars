import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';

export class EarthCatapultRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.EARTH_CATAPULT_REBALANCED,
      tags: [Tags.EARTH],
      cost: 28,
      cardDiscount: {amount: 2},
      metadata: {
        cardNumber: '070',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a card, you pay 2 M€ less for it.', (eb) => {
            eb.empty().startEffect.megacredits(-2);
          });
        }),
        victoryPoints: 1,
      },
    });
  }

  public getCardDiscount() {
    return 2;
  }
  public play() {
    return undefined;
  }
  public getVictoryPoints() {
    return 1;
  }
}
