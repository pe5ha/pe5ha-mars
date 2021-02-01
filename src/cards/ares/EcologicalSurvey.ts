import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {ISpace} from '../../boards/ISpace';
import {SpaceBonus} from '../../SpaceBonus';
import {TileType} from '../../TileType';
import {Resources} from '../../Resources';
import {ResourceType} from '../../ResourceType';
import {AddResourcesToCard} from '../../deferredActions/AddResourcesToCard';
import {GainResources} from '../../deferredActions/GainResources';
import {Phase} from '../../Phase';
import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class EcologicalSurvey extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.ECOLOGICAL_SURVEY,
      tags: [Tags.SCIENCE],
      cost: 9,

      requirements: CardRequirements.builder((b) => b.greeneries(3).any()),
      metadata: {
        description: 'Requires 3 greeneries on Mars.',
        cardNumber: 'A07',
        renderData: CardRenderer.builder((b) => {
          b.effect('When placing a tile grants you any plants, animals or microbes, you gain one additional of each of those resources that you gain.', (eb) => {
            eb.emptyTile().startEffect;
            eb.plus().plants(1).animals(1).microbes(1);
          });
        }),
      },
    });
  }

  private hasAdjacencyBonus(player: Player, space: ISpace, bonus: SpaceBonus) {
    return player.game.board.getAdjacentSpaces(space).some((adj) => adj.adjacency?.bonus.includes(bonus));
  }

  public onTilePlaced(player: Player, space: ISpace) {
    if (player.game.phase === Phase.SOLAR || player.id !== space.player?.id) {
      return;
    }

    // Plants
    if (space.bonus.includes(SpaceBonus.PLANT) ||
        this.hasAdjacencyBonus(player, space, SpaceBonus.PLANT) ||
        (space.tile?.tileType === TileType.OCEAN && player.playedCards.some((card) => card.name === CardName.ARCTIC_ALGAE))) {
      player.game.defer(new GainResources(
        player,
        Resources.PLANTS,
        {
          logMessage: '${0} gained a bonus ${1} because of ${2}',
          logBuilder: (b) => b.player(player).string(Resources.PLANTS).cardName(this.name),
        }));
    }

    // Microbes and Animals
    ([[ResourceType.MICROBE, SpaceBonus.MICROBE], [ResourceType.ANIMAL, SpaceBonus.ANIMAL]] as [ResourceType, SpaceBonus][]).forEach(([resource, bonus]) => {
      if (player.playedCards.some((card) => card.resourceType === resource) &&
          (space.bonus.includes(bonus) || this.hasAdjacencyBonus(player, space, bonus))) {
        player.game.defer(new AddResourcesToCard(
          player,
          resource,
          {
            logMessage: '${0} gained a bonus ${1} because of ${2}',
            logBuilder: (b) => b.player(player).string(resource).cardName(this.name),
          }));
      }
    });
  }

  public play() {
    return undefined;
  }
}
