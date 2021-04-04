import 'mocha';
import { expect } from 'chai';
import { Menu } from '../../src/Menu';
import { Dessert, FirstPlate, Ingredient, SecondPlate, StarterPlate } from '../../src/Plate';
import { FoodGroup, Macronutrients, Meat } from '../../src/Food';

describe('Menu tests', () => {
  const menu = new Menu(
      new StarterPlate(
          new Ingredient(
              new Meat('Ternera', 'Argentina', 12, new Macronutrients(1, 2, 7)), 1000
          )
      ),
      new FirstPlate(
          new Ingredient(
              new Meat('Costillas', 'Canarias', 7, new Macronutrients()), 1000
          )
      ),
      new SecondPlate(
          new Ingredient(
              new Meat('Chuleta', 'Galicia', 15, new Macronutrients()), 2000
          )
      )
  );


  it('Can be instanciated', () => {
    expect(menu instanceof Menu).to.be.true;
  });

  it('Validates bad plates config correctly', () => {
    expect(menu.platesAreValid(
        [
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1))
        ]
    )).to.be.false;

    expect(menu.platesAreValid(
        [
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1))
        ]
    )).to.be.false;

    expect(menu.platesAreValid(
        [
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1))
        ]
    )).to.be.false;
  });

  it('Validates good plates config correctly', () => {
    expect(menu.platesAreValid(
        [
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new StarterPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new SecondPlate(new Ingredient(new Meat('Chuleta', 'Galicia', 15, new Macronutrients()), 2))
        ]
    )).to.be.true;

    expect(menu.platesAreValid(
        [
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new StarterPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new Dessert(new Ingredient(new Meat('Carne dulce', 'Cataluña', 15, new Macronutrients()), 1))
        ]
    )).to.be.true;

    expect(menu.platesAreValid(
        [
          new FirstPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new StarterPlate(new Ingredient(new Meat('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new SecondPlate(new Ingredient(new Meat('Chuleta', 'Galicia', 15, new Macronutrients()), 2)),
          new Dessert(new Ingredient(new Meat('Carne dulce', 'Cataluña', 15, new Macronutrients()), 1))
        ]
    )).to.be.true;
  
  });

  it('Calculates Menu\'s price', () => {
    expect(menu.getPrice()).to.be.eq(49);
  });

  it('Calculates menu\'s nutritional composition', () => {
    expect(menu.getNutritionalComposition()).to.be.eql(
        {
          lipids: 10, 
          carbohydrates: 20, 
          proteins: 70
        }
    );
  });

  // Falta mejorar este test
  it('Lists food groups', () => {
    expect(menu.listFoodGroups()).to.be.eql([FoodGroup.proteinRich]);
  });
  
});
