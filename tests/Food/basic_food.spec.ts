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

  it('Has getters', () => {
    const mockFood = new MockFood();
    expect(mockFood.getName()).to.be.eq('Plátano');
    expect(mockFood.getOrigin()).to.be.eq('Canarias');
    expect(mockFood.getPriceByKg()).to.be.eq(10);
    expect(mockFood.getMacronutrients()).to.be.eql(
        {
          lipids: 1,
          carbohydrates: 2,
          proteins: 3,
        }
    );
  });  

  it('Has setters', () => {
    const mockFood = new MockFood();
    mockFood.setName('Papa');
    expect(mockFood.getName()).to.be.eq('Papa');
    mockFood.setOrigin('Irlanda')
    expect(mockFood.getOrigin()).to.be.eq('Irlanda');
    mockFood.setPriceByKg(7);
    expect(mockFood.getPriceByKg()).to.be.eq(7);
    
    mockFood.setMacronutrients({lipids: 9, carbohydrates: 8, proteins: 7});
    expect(mockFood.getMacronutrients()).to.be.eql(
        {
          lipids: 9,
          carbohydrates: 8,
          proteins: 7,
        }
    );
  });  
});


