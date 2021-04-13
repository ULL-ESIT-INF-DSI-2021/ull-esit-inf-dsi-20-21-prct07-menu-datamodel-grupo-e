import 'mocha';
import { expect } from 'chai';
import { RichProteinFood, FoodGroup } from '../../src/Food/index';


describe('RichProteinFood tests', () => {
  it('Can be instanciated', () => {
    expect((new RichProteinFood('carne', 'Argentina', 10, {lipids: 1, carbohydrates: 5, proteins: 20})) instanceof RichProteinFood).to.be.true;
  });

  it('Returns the right group', () => {
    expect((new RichProteinFood('carne', 'Argentina', 10, {lipids: 1, carbohydrates: 5, proteins: 20})).getFoodGroup()).to.be.eq(FoodGroup.proteinRich);
  });
});
