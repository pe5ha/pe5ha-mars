import {expect} from 'chai';
import {Solarnet} from '../../../src/cards/venusNext/Solarnet';
import {Game} from '../../../src/Game';
import {TestPlayers} from '../../TestPlayers';

describe('Solarnet', function() {
  it('Should play', function() {
    const card = new Solarnet();
    const player = TestPlayers.BLUE.newPlayer();
    const redPlayer = TestPlayers.RED.newPlayer();
    Game.newInstance('foobar', [player, redPlayer], player);
    expect(card.canPlay(player)).is.not.true;

    player.tagsForTest = {venus: 1};
    expect(card.canPlay(player)).is.not.true;

    player.tagsForTest = {earth: 1};
    expect(card.canPlay(player)).is.not.true;

    player.tagsForTest = {jovian: 1};
    expect(card.canPlay(player)).is.not.true;

    player.tagsForTest = {venus: 1, earth: 1};
    expect(card.canPlay(player)).is.not.true;

    player.tagsForTest = {jovian: 1, earth: 1};
    expect(card.canPlay(player)).is.not.true;

    player.tagsForTest = {venus: 1, jovian: 1};
    expect(card.canPlay(player)).is.not.true;

    player.tagsForTest = {venus: 1, jovian: 1, earth: 1};
    expect(card.canPlay(player)).is.true;

    const action = card.play(player);
    expect(action).is.undefined;
    expect(player.cardsInHand).has.lengthOf(2);
  });
});