import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Tags} from '../../Tags';
import {ResourceType} from '../../../ResourceType';
import {Resources} from '../../../Resources';
import {IProjectCard} from '../../IProjectCard';
import {SelectOption} from '../../../inputs/SelectOption';
import {OrOptions} from '../../../inputs/OrOptions';
import {Card} from '../../Card';
import {CardName} from '../../../CardName';
import {IResourceCard} from '../../ICard';
import {CardType} from '../../CardType';
import {CardRenderer} from '../../render/CardRenderer';
import {Units} from '../../../Units';

export class RecyclonRebalanced extends Card implements CorporationCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.RECYCLON_REBALANCED,
      tags: [Tags.MICROBE, Tags.BUILDING],
      startingMegaCredits: 40,
      resourceType: ResourceType.MICROBE,
      productionBox: Units.of({steel: 2}),

      metadata: {
        cardNumber: 'R26',
        description: 'You start with 40 M€ and 2 steel production.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(40).nbsp.production((pb) => pb.steel(2));
          b.corpBox('effect', (ce) => {
            ce.effect('When you play a building tag, including this, gain 1 microbe to this card, or remove 2 microbes here and raise your plant production 1 step.', (eb) => {
              eb.building().played.colon().microbes(1).or();
              eb.microbes(2).digit.startEffect.production((pb) => pb.plants(1));
            });
          });
        }),
      },
    });
  }
    public resourceCount = 0;

    public play(player: Player) {
      player.addProduction(Resources.STEEL, 2);
      player.addResourceTo(this);
      return undefined;
    }
    public onCardPlayed(player: Player, card: IProjectCard) {
      if (card.tags.includes(Tags.BUILDING) === false || !player.isCorporation(this.name)) {
        return undefined;
      }
      if (this.resourceCount < 2) {
        player.addResourceTo(this);
        return undefined;
      }

      const addResource = new SelectOption('Add a microbe resource to this card', 'Add microbe', () => {
        player.addResourceTo(this);
        return undefined;
      });

      const spendResource = new SelectOption('Remove 2 microbes on this card and increase plant production 1 step', 'Remove microbes', () => {
        player.removeResourceFrom(this, 2);
        player.addProduction(Resources.PLANTS, 1);
        return undefined;
      });
      return new OrOptions(spendResource, addResource);
    }
}
