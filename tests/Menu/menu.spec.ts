import 'mocha';
import { expect } from 'chai';
import { Menu } from '../../src/Menu';
import { Dessert, FirstPlate, Ingredient, SecondPlate, StarterPlate } from '../../src/Plate';
import { FoodGroup, Fruit, Macronutrients, RichProteinFood } from '../../src/Food';

// Mejorar estos tests

describe('Menu tests', () => {
  const plates = [
    new StarterPlate( 'Entrante de ternera',
        new Ingredient(
            new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients(1, 2, 7)), 1000
        )
    ),
    new FirstPlate( 'Costillas asadas',
        new Ingredient(
            new RichProteinFood('Costillas', 'Canarias', 7, new Macronutrients()), 1000
        )
    ),
    new SecondPlate( 'Chuleta al horno',
        new Ingredient(
            new RichProteinFood('Chuleta', 'Galicia', 15, new Macronutrients()), 2000
        )
    )
  ];

  const menu = new Menu('Grill lovers', ...plates);


  it('Can be instanciated', () => {
    expect(menu instanceof Menu).to.be.true;
  });

  it('Validates bad plates config correctly', () => {
    expect(menu.platesAreValid(
        [
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1))
        ]
    )).to.be.false;

    expect(menu.platesAreValid(
        [
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1))
        ]
    )).to.be.false;

    expect(menu.platesAreValid(
        [
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1))
        ]
    )).to.be.false;
  });

  it('Validates good plates config correctly', () => {
    expect(menu.platesAreValid(
        [
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new StarterPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new SecondPlate('', new Ingredient(new RichProteinFood('Chuleta', 'Galicia', 15, new Macronutrients()), 2))
        ]
    )).to.be.true;

    expect(menu.platesAreValid(
        [
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new StarterPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new Dessert('', new Ingredient(new RichProteinFood('Carne dulce', 'Cataluña', 15, new Macronutrients()), 1))
        ]
    )).to.be.true;

    expect(menu.platesAreValid(
        [
          new FirstPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new StarterPlate('', new Ingredient(new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients()), 1)),
          new SecondPlate('', new Ingredient(new RichProteinFood('Chuleta', 'Galicia', 15, new Macronutrients()), 2)),
          new Dessert('', new Ingredient(new RichProteinFood('Carne dulce', 'Cataluña', 15, new Macronutrients()), 1))
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
  
  it('Retrieves all plates', () => {
    expect(menu.getPlates()).to.be.eql(plates);
  });

  it('Adds a new plate', () => {
    const appleDessert = new Dessert( 'Postre de manzana',
        new Ingredient(
            new Fruit('Manzana', 'Tacoronte', 3, new Macronutrients()),
            1
        )
    );

    menu.addPlate(appleDessert);
    expect(menu.getPlates()).to.be.eql(plates.concat(appleDessert));
  });

  it('Removes a plate by name', () => {
    menu.removePlate('Postre de manzana');
    expect(menu.getPlates()).to.be.eql(plates);
  });

  it('Adds a repeat plate', () => {
    const vealStarter = new StarterPlate( 'Entrante de ternera',
        new Ingredient(
            new RichProteinFood('Ternera', 'Argentina', 12, new Macronutrients(1, 2, 7)), 1000
        )
    ); 

    menu.addPlate(vealStarter);
    expect(menu.getPlates()).to.be.eql(plates);
  });

  it('Get the name of menu', () => {
    expect(menu.getNameOfMenu()).to.be.equal('Grill lovers');
  });

});
