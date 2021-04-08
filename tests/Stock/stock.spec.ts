import 'mocha';
import { expect } from 'chai';
import { Stock } from '../../src/Stock';
import { Fruit, Macronutrients, Meat } from '../../src/Food';
import { Dessert, FirstPlate, Ingredient, SecondPlate, StarterPlate } from '../../src/Plate';
import { Menu } from '../../src/Menu';

const apple = new Fruit('manzana', 'Australia', 2, {lipids: 3, carbohydrates: 6, proteins: 5});

describe('Stock Food tests', () => {
  const stock = new Stock('./tests/Stock/database_test.json');
  it('Can be instanciated', () => {
    expect(stock instanceof Stock).to.be.true;
  });

  it('Adds a food element', () => {
    stock.addFood(apple);
    expect(stock.getFoods()).to.be.eql([apple]);
  });

  it('Does not add a repeated food', () => {
    stock.addFood(apple);
    expect(stock.getFoods()).to.be.eql([apple]);
  });

  it('Added food persists', () => {
    const newStock = new Stock('./tests/Stock/database_test.json');
    expect(newStock.getFoods()).to.be.eql([apple]);
  });

  it('Deletes a food element', () => {
    stock.deleteFood('manzana');
    expect(stock.getFoods()).to.be.eql([]);
  });

  it('Deletes food element from database', () => {
    const newStock = new Stock('./tests/Stock/database_test.json');
    expect(newStock.getFoods()).to.be.eql([]);
  });

});

describe('Stock plates tests', () => {
  const stock = new Stock('./tests/Stock/database_test.json');

  const applePie = new Dessert('Pie de manzana', new Ingredient(apple, 350));

  it('Adds a plate', () => {
    stock.addPlate(applePie);
    expect(stock.getPlates()).to.be.eql([applePie]);
  });

  it('Does not add a repeated plate', () => {
    stock.addPlate(applePie);
    expect(stock.getPlates()).to.be.eql([applePie]);
  });

  it('Added plate persists', () => {
    const newStock = new Stock('./tests/Stock/database_test.json');
    expect(newStock.getPlates()).to.be.eql([applePie]);
  });

  it('Deletes a plate element', () => {
    stock.deletePlate('Pie de manzana');
    expect(stock.getPlates()).to.be.eql([]);
  });

  it('Deletes plate element from database', () => {
    const newStock = new Stock('./tests/Stock/database_test.json');
    expect(newStock.getPlates()).to.be.eql([]);
  });
});

describe('Stock menu test', () => {
  const stock = new Stock('./tests/Stock/database_test.json');

  const plates = [
    new StarterPlate( 'Entrante de ternera',
        new Ingredient(
            new Meat('Ternera', 'Argentina', 12, new Macronutrients(1, 2, 7)), 1000
        )
    ),
    new FirstPlate( 'Costillas asadas',
        new Ingredient(
            new Meat('Costillas', 'Canarias', 7, new Macronutrients()), 1000
        )
    ),
    new SecondPlate( 'Chuleta al horno',
        new Ingredient(
            new Meat('Chuleta', 'Galicia', 15, new Macronutrients()), 2000
        )
    )
  ];

  const menu = new Menu('Grill lovers', ...plates);

  it('Add a menu', () => {
    stock.addMenu(menu);
    console.log(stock.getMenus())
    expect(stock.getMenus()).to.be.eql([menu]);
  });

  // it('Does not add a repeated menu', () => {
  //   stock.addMenu(menu);
  //   expect(stock.getMenus()).to.be.eql([menu]);
  // });
});

