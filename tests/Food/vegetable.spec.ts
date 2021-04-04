import 'mocha';
import { expect } from 'chai';
import { Vegetable } from '../../src/Food/index';

describe('Vegetable tests', () => {
  const garbanzos = new Vegetable('garbanzos', 'India', 1.8, {lipids: 1.2, carbohydrates: 9, proteins: 1});
  it('Can be instanciated', () => {
    expect(garbanzos instanceof Vegetable).to.be.true;
  });

  it('Group food', () => {
    expect(garbanzos.getFoodGroup()).to.be.eq('Verduras y hortalizas.')
  });

  it('Prints info correctly', () => {
    expect(garbanzos.getInfo()).to.be.eq(
        'Vegetal\n' +
        'Name: garbanzos\n' +
        'Origin: India\n' +
        'Price: 1.8 € / Kg\n' +
        'Macronutrients (per 100 g):\n' +
        '  lipids: 1.2\n' +
        '  carbohydrates: 9\n' +
        '  proteins: 1\n'
    );
  });
});