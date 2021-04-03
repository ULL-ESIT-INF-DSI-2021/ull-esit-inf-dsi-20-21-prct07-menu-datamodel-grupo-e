import 'mocha';
import { expect } from 'chai';
import { Ingredient } from '../../src/Plate/index';
import { BasicFood, FoodGroup } from '../../src/Food';


class MockFood extends BasicFood {
  constructor() {
    const macronutrients = {
      lipids: 1,
      carbohydrates: 2,
      proteins: 3,
    };
    super('Plátano', 'Canarias', 10, macronutrients);
  }


  getFoodGroup(): FoodGroup {
    return FoodGroup.proteinRich;
  }
}

describe('Ingredient tests', () => {
  const ingredient = new Ingredient(new MockFood(), 2000);

  it('Can be instanciated', () => {
    expect(( ingredient instanceof Ingredient)).to.be.true;
  });


  it('Calculates food\'s price', () => {
    expect(ingredient.getPrice()).to.be.eq(20);
  });

  it('Calculates food\'s nutritional composition', () => {
    expect(ingredient.getNutritionalComposition()).to.be.eql(
        {
          lipids: 20, 
          carbohydrates: 40,
          proteins: 60,
        }
    );
  });

  
});


