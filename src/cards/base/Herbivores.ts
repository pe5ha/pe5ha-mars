import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {ISpace} from '../../boards/ISpace';
import {ResourceType} from '../../ResourceType';
import {TileType} from '../../TileType';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {IResourceCard} from '../ICard';
import {AddResourcesToCard} from '../../deferredActions/AddResourcesToCard';
import {DecreaseAnyProduction} from '../../deferredActions/DecreaseAnyProduction';
import {CardRenderer} from '../render/CardRenderer';
import {CardRequirements} from '../CardRequirements';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {Size} from '../render/Size';

export class Herbivores extends Card implements IProjectCard, IResourceCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.HERBIVORES,
      tags: [Tags.ANIMAL],
      cost: 12,
      resourceType: ResourceType.ANIMAL,

      requirements: CardRequirements.builder((b) => b.oxygen(8)),
      metadata: {
        cardNumber: '147',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you place a greenery tile, add an Animal to this card.', (eb) => {
            eb.greenery(Size.MEDIUM, false).startEffect.animals(1);
          }).br;
          b.vpText('1 VP per 2 Animals on this card.');
          b.animals(1).production((pb) => pb.minus().plants(1).any);
        }),
        description: {
        // TODO (chosta): revert the original description once a solution for description space is found
          text: 'Requires 8% oxygen. +1 animal to this card. -1 any plant production',
          align: 'left',
        },
        victoryPoints: CardRenderDynamicVictoryPoints.animals(1, 2),
      },
    });
  }
    public resourceCount: number = 0;

    public warning?: string;

    public canPlay(player: Player): boolean {
      this.warning = undefined;
      if (super.canPlay(player) && player.game.someoneElseHasResourceProduction(Resources.PLANTS, 1, player) === false) {
        this.warning = 'You will have to decrease your own plant production because no other player has enough.';
      }
      return super.canPlay(player) && player.game.someoneHasResourceProduction(Resources.PLANTS, 1);
    }

    public getVictoryPoints(): number {
      return Math.floor(this.resourceCount / 2);
    }

    public onTilePlaced(cardOwner: Player, activePlayer: Player, space: ISpace) {
      if (cardOwner.id === activePlayer.id && space.tile?.tileType === TileType.GREENERY) {
        cardOwner.game.defer(new AddResourcesToCard(cardOwner, ResourceType.ANIMAL, {filter: (c) => c.name === this.name}));
      }
    }

    public play(player: Player) {
      player.addResourceTo(this);
      player.game.defer(new DecreaseAnyProduction(player, Resources.PLANTS, 1));
      this.warning = undefined;
      return undefined;
    }
}
