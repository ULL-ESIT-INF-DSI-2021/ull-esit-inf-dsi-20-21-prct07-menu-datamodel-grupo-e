import 'mocha';
import { expect } from 'chai';
import { Meat } from '../../src/Food/index';

describe('Meat tests', () => {
  const corderoChuleta = new Meat('cordero: chuleta', 'Argentina', 12, {lipids: 17, carbohydrates: 0, proteins: 8});
  it('Can be instanciated', () => {
    expect(corderoChuleta instanceof Meat).to.be.true;
  });

  it('Prints info correctly', () => {
    expect(corderoChuleta.getInfo()).to.be.eq(
        'CARNE\n' +
        'Name: cordero: chuleta\n' +
        'Origin: Argentina\n' +
        'Price: 12 € / Kg\n' +
        'Macronutrients (per 100 g):\n' +
        '  lipids: 17\n' +
        '  carbohydrates: 0\n' +
        '  proteins: 8\n'
    );
  });
});
