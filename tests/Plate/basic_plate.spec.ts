import 'mocha';
import { expect } from 'chai';
import { BasicPlate, Ingredient } from '../../src/Plate';
import { BasicFood, FoodGroup, Macronutrients, Meat } from '../../src/Food';
import { PlateType } from '../../src/Plate/basic_plate';

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
    return FoodGroup.Fruits;
  }
}


class MockPlate extends BasicPlate {
  constructor() {
    super( 'Ternerada',
        [
          new Ingredient(new MockFood(), 500), 
          new Ingredient(new MockFood(), 500),
          new Ingredient(new Meat('Ternera', 'Argentina', 7, new Macronutrients()), 200),
          new Ingredient(new Meat('Ternera', 'Argentina', 7, new Macronutrients()), 200),
          new Ingredient(new Meat('Ternera', 'Argentina', 7, new Macronutrients()), 200)
        ]
    );
  }

  getType() {
    return PlateType.firstPlate;
  }
}

describe('BasicPlate tests', () => {
  const plate = new MockPlate();
  
  it('Can be instanciated', () => {
    expect(plate instanceof BasicPlate).to.be.true;
  });

  it('Retrieves name', () => {
    expect(plate.getName()).to.be.eq('Ternerada');
  });
  
  it('Calculates the predominant food group', () => {
    expect(plate.getPredominantFoodGroup()).to.be.eq(FoodGroup.proteinRich);
  });

  it('Calculates the price of the plate', () => {
    expect(plate.getPrice()).to.be.closeTo(14.2, 0.001);
  });

  it('Calculates nutritional composition of plate', () => {
    expect(plate.getNutritionalComposition()).to.be.eql(
        {
          lipids: 10,
          carbohydrates: 20,
          proteins: 30
        }
    );
  });

  it('Retrieves food groups present in plate', () => {
    expect(plate.getFoodgroups()).to.be.eql([FoodGroup.Fruits, FoodGroup.proteinRich]);
  });

});
