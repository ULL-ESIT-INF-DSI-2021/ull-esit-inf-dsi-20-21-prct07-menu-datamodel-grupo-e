import 'mocha';
import { expect } from 'chai';
import { Macronutrients } from '../../src/Food/index';


describe('Macronutrients tests', () => {
  it('Can be instanciated', () => {
    expect(new Macronutrients(10, 20, 30)).to.be.eql(
        {
          lipids: 10,
          carbohydrates: 20,
          proteins: 30,
        }
    );

    expect(new Macronutrients()).to.be.eql(
        {
          lipids: 0,
          carbohydrates: 0,
          proteins: 0,
        }
    );
  });
});
