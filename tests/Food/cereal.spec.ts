import 'mocha';
import { expect } from 'chai';
import { Cereal } from '../../src/Food/index';

describe('Cereal tests', () => {
  const trigo = new Cereal('trigo', 'China', 1.5, {lipids: 1, carbohydrates: 8, proteins: 2});
  it('Can be instanciated', () => {
    expect(trigo instanceof Cereal).to.be.true;
  });

  it('Group food', () => {
    expect(trigo.getFoodGroup()).to.be.eq('Cereales.')
  });

  it('Prints info correctly', () => {
    expect(trigo.getInfo()).to.be.eq(
        'Cereales\n' +
        'Name: trigo\n' +
        'Origin: China\n' +
        'Price: 1.5 € / Kg\n' +
        'Macronutrients (per 100 g):\n' +
        '  lipids: 1\n' +
        '  carbohydrates: 8\n' +
        '  proteins: 2\n'
    );
  });
});