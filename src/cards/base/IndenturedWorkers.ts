import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';

export class IndenturedWorkers extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.INDENTURED_WORKERS,
      cost: 0,
      victoryPoints: -1,

      metadata: {
        cardNumber: '195',
        renderData: CardRenderer.builder((b) => {
          b.text('next card', Size.SMALL, true).colon().megacredits(-8);
        }),
        description: 'The next card you play this generation costs 8 M€ less.',
      },
    });
  }

  public getCardDiscount(player: Player) {
    if (player.lastCardPlayed === this.name) {
      return 8;
    }
    return 0;
  }
  public play() {
    return undefined;
  }
}
