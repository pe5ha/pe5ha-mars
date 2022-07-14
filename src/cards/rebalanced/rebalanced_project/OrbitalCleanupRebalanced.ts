import {IProjectCard} from '../../IProjectCard';
import {Tags} from '../../Tags';
import {Card} from '../../Card';
import {CardType} from '../../CardType';
import {Player} from '../../../Player';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardRenderer} from '../../render/CardRenderer';


export class OrbitalCleanupRebalanced extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.ORBITAL_CLEANUP_REBALANCED,
      tags: [Tags.EARTH],
      cost: 14,

      metadata: {
        cardNumber: 'X08',
        renderData: CardRenderer.builder((b) => {
          b.action('Gain 1 M€ per Science tag you have.', (eb) => {
            eb.empty().startAction.megacredits(1).slash().science().played;
          }).br;
          b.production((pb) => {
            pb.megacredits(-2);
          });
        }),
        description: 'Decrease your M€ production 2 steps.',
        victoryPoints: 1,
      },
    });
  }

  public canPlay(player: Player): boolean {
    return player.getProduction(Resources.MEGACREDITS) >= -3;
  }

  public play(player: Player) {
    player.addProduction(Resources.MEGACREDITS, -2);
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    player.addResource(Resources.MEGACREDITS, player.getTagCount(Tags.SCIENCE), {log: true});
    return undefined;
  }

  public getVictoryPoints() {
    return 1;
  }
}
