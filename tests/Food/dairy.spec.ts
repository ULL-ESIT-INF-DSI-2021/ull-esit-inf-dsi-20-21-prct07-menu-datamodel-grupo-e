import 'mocha';
import { expect } from 'chai';
import { Dairy, FoodGroup } from '../../src/Food/index';


describe('Dairy tests', () => {
  it('Can be instanciated', () => {
    expect((new Dairy('Leche', 'Galicia', 10, {lipids: 1, carbohydrates: 5, proteins: 20})) instanceof Dairy).to.be.true;
  });

  it('Returns the right group', () => {
    expect((new Dairy('Leche', 'Galicia', 10, {lipids: 1, carbohydrates: 5, proteins: 20})).getFoodGroup()).to.be.eq(FoodGroup.Dairy);
  });
});
