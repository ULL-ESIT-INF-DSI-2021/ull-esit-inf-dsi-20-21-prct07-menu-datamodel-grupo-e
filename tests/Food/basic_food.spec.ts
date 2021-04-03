import 'mocha';
import { expect } from 'chai';
import { BasicFood } from '../../src/Food/index';

/**
 * Mock class for testing BasicFood
 */
class MockFood extends BasicFood {
  constructor() {
    const macronutrients = {
      lipids: 1,
      carbohydrates: 2,
      proteins: 3,
    };
    super('Plátano', 'Canarias', 10, macronutrients);
  }

  getInfo(): string {
    return `${this.name} from ${this.origin}`;
  }

  foodGroup(): string {
    return 'Grupo Mock de comida';
  }
}

describe('BasicFood tests', () => {
  it('Can be instianciated', () => {
    expect((new MockFood()) instanceof BasicFood).to.be.true;
  });

  
});
