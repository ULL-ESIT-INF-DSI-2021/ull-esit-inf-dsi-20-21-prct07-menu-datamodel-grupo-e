import 'mocha';
import { expect } from 'chai';
import { Fruit, Macronutrients, Vegetable, RichProteinFood } from '../../src/Food';
import { Menu } from '../../src/Menu';
import { StarterPlate, Ingredient, FirstPlate, SecondPlate } from '../../src/Plate';
import { CommandOrder } from '../../src/Command';

describe('CommandOrder tests', () => {
  const plates = [
    new StarterPlate('Entrante', 
        new Ingredient(
            new Fruit('Pera', 'Tacoronte', 3, new Macronutrients()),
            1
        )
    ),
    new FirstPlate('PrimerPlato', 
        new Ingredient(
            new Vegetable('Zanahora', 'Galicia', 3, new Macronutrients()),
            1
        )
    ),
    new SecondPlate('SegundoPlato', 
        new Ingredient(
            new RichProteinFood('Costillas', 'Brasil', 12, new Macronutrients()),
            1
        )
    ),
  ];

  
  const commandOrder = new CommandOrder(plates[0], 2);
  it('Can be instanciated', () => {
    expect( commandOrder instanceof CommandOrder).to.be.true;
  });

  it('Retrieves order', () => {
    expect(commandOrder.getOrder()).to.be.eql(plates[0]);
  });

  it('Retrieves quantity', () => {
    expect(commandOrder.getQuantity()).to.be.eq(2);
  });
});
