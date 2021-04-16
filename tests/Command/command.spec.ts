import 'mocha';
import { expect } from 'chai';
import { Command, CommandOrder } from '../../src/Command';
import { Fruit, Macronutrients, Vegetable, RichProteinFood } from '../../src/Food';
import { Menu } from '../../src/Menu';
import { StarterPlate, Ingredient, FirstPlate, SecondPlate } from '../../src/Plate';


describe('Command tests', () => {
  const menu1 = new Menu('Menu 1',
      [
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
      ]
  );

  const command = new Command([new CommandOrder(menu1, 1)]);

  it('Can be instanciated', () => {
    expect(command instanceof Command).to.be.true;
  });

  it('Retrieves orders', () => {
    expect(command.getOrders()).to.be.eql([new CommandOrder(menu1, 1)]);
  });

  it('Adds a new order', () => {
    command.addOrder(new CommandOrder(menu1, 2));
    expect(command.getOrders()).to.be.eql([new CommandOrder(menu1, 1), new CommandOrder(menu1, 2)]);
  });

});
