import {Colony} from './Colony';
import {Resources} from '../Resources';
import {ColonyName} from './ColonyName';
import {ColonyBenefit} from './ColonyBenefit';

export class GanymedeRebalanced extends Colony {
    public name = ColonyName.GANYMEDE_REBALANCED;
    public description = 'Plants';
    public buildType = ColonyBenefit.GAIN_PRODUCTION;
    public buildResource = Resources.PLANTS;
    public tradeType = ColonyBenefit.GAIN_RESOURCES;
    public tradeQuantity = [1, 2, 3, 4, 5, 6, 7];
    public tradeResource = Resources.PLANTS;
    public colonyBonusType = ColonyBenefit.GAIN_RESOURCES;
    public colonyBonusResource = Resources.PLANTS;
}
