import {expect} from 'chai';
import {BiofuelsRebalanced} from '../../../../src/cards/rebalanced/rebalanced_prelude/BiofuelsRebalanced';
import {Resources} from '../../../../src/Resources';
import {TestPlayers} from '../../../TestPlayers';

describe('BiofuelsRebalanced', function() {
  it('Should play', function() {
    const card = new BiofuelsRebalanced();
    const player = TestPlayers.BLUE.newPlayer();
    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.getProduction(Resources.ENERGY)).to.eq(2);
    expect(player.getProduction(Resources.PLANTS)).to.eq(1);
    expect(player.plants).to.eq(2);
  });
});
