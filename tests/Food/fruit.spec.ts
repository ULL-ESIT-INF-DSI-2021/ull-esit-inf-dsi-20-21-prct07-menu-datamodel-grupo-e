import 'mocha';
import { expect } from 'chai';
import { Fruit } from '../../src/Food/index';

describe('Fruit tests', () => {
  const manzana = new Fruit('manzana', 'Australia', 2, {lipids: 3, carbohydrates: 6, proteins: 5});
  it('Can be instanciated', () => {
    expect(manzana instanceof Fruit).to.be.true;
  });

  it('Group food', () => {
    expect(manzana.getFoodGroup()).to.be.eq('Frutas.')
  });

  it('Prints info correctly', () => {
    expect(manzana.getInfo()).to.be.eq(
        'Fruta\n' +
        'Name: manzana\n' +
        'Origin: Australia\n' +
        'Price: 2 € / Kg\n' +
        'Macronutrients (per 100 g):\n' +
        '  lipids: 3\n' +
        '  carbohydrates: 6\n' +
        '  proteins: 5\n'
    );
  });
});