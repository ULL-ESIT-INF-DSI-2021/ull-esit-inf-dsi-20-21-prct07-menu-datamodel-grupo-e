import 'mocha';
import { expect } from 'chai';
import { RichProteinFood, FoodGroup } from '../../src/Food/index';


class MockProteinfulFood extends RichProteinFood {
  constructor() {
    super('carne', 'Argentina', 10, {lipids: 1, carbohydrates: 5, proteins: 20});
  }

  getInfo(): string {
    return `${this.name} de ${this.origin}.`;
  }
}

describe('RichProteinFood tests', () => {
  it('Can be instanciated', () => {
    expect((new MockProteinfulFood()) instanceof RichProteinFood).to.be.true;
  });

  it('Returns the right group', () => {
    expect((new MockProteinfulFood()).getFoodGroup()).to.be.eq(FoodGroup.proteinRich);
  });
});
