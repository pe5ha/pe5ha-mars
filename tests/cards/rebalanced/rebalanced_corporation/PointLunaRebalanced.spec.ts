import {expect} from 'chai';
import {Ants} from '../../../../src/cards/base/Ants';
import {EarthCatapult} from '../../../../src/cards/base/EarthCatapult';
import {PointLunaRebalanced} from '../../../../src/cards/rebalanced/rebalanced_corporation/PointLunaRebalanced';
import {Game} from '../../../../src/Game';
import {Player} from '../../../../src/Player';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('PointLunaRebalanced', function() {
  let card : PointLunaRebalanced; let player : Player;

  beforeEach(function() {
    card = new PointLunaRebalanced();
    player = TestPlayers.BLUE.newPlayer();
    Game.newInstance('foobar', [player], player);
    player.corporationCard = card;
  });

  it('Gets card when earth tag played', function() {
    card.onCardPlayed(player, new Ants());
    expect(player.cardsInHand).has.lengthOf(0);

    card.onCardPlayed(player, new EarthCatapult());
    expect(player.cardsInHand).has.lengthOf(1);
  });

  it('Should play', function() {
    card.play(player);
    expect(player.getProduction(Resources.TITANIUM)).to.eq(1);
    expect(player.cardsInHand).has.lengthOf(1);
  });
});
