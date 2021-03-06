import 'mocha';
import { expect } from 'chai';
import { Stock } from '../../src/Stock';
import { Cereal, Fruit, Macronutrients, RichProteinFood, Vegetable } from '../../src/Food';
import { Dessert, FirstPlate, Ingredient, SecondPlate, StarterPlate } from '../../src/Plate';
import { Menu } from '../../src/Menu';
import { Carta } from '../../src/Carta';
import deepEqualInAnyOrder = require('deep-equal-in-any-order');
import chai = require('chai');

chai.use(deepEqualInAnyOrder);

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

  it('removes a food element', () => {
    stock.removeFood('manzana');
    expect(stock.getFoods()).to.be.eql([]);
  });

  it('removes food element from database', () => {
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

  it('removes a plate element', () => {
    stock.removePlate('Pie de manzana');
    expect(stock.getPlates()).to.be.eql([]);
  });

  it('removes plate element from database', () => {
    const newStock = new Stock('./tests/Stock/database_test.json');
    expect(newStock.getPlates()).to.be.eql([]);
  });
});

describe('Stock menu test', () => {
  const stock = new Stock('./tests/Stock/database_test.json');

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

  const menu = new Menu('Grill lovers', plates);

  it('Add a menu', () => {
    stock.addMenu(menu);
    expect(stock.getMenus()).to.be.eql([menu]);
  });

  it('Does not add a repeated menu', () => {
    stock.addMenu(menu);
    expect(stock.getMenus()).to.be.eql([menu]);
  });

  it('Added menu persists', () => {
    const newStock = new Stock('./tests/Stock/database_test.json');
    expect(newStock.getMenus()).to.be.eql([menu]);
  });

  it('removes a menu element', () => {
    stock.removeMenu('Grill lovers');
    expect(stock.getMenus()).to.be.eql([]);
  });

  it('removes menu element from database', () => {
    const newStock = new Stock('./tests/Stock/database_test.json');
    expect(newStock.getMenus()).to.be.eql([]);
  });
});

/** ***************************************/ 
describe('Stock Carta test', () => {

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
  const menu2 = new Menu('Menu 2',
      [
        new Dessert('Postre', 
            new Ingredient(
                new Fruit('Pera', 'Tacoronte', 3, new Macronutrients()),
                1
            )
        ),
        new FirstPlate('PrimerPlato2', 
            new Ingredient(
                new Cereal('Avena', 'Madrid', 3, new Macronutrients()),
                2
            )
        ),
        new SecondPlate('SegundoPlato2', 
            new Ingredient(
                new RichProteinFood('Costillas', 'Brasil', 12, new Macronutrients()),
                1
            )
        ),
      ]
  );

  const singlePlates = [
    new FirstPlate('Carne fiesta', new Ingredient(new RichProteinFood('Cerdo', 'Canarias', 7, new Macronutrients()), 1)),
    new Dessert('Applepie', new Ingredient(new Fruit('manzana', 'Tacoronte', 3, new Macronutrients()), 250))
  ];

  const carta = new Carta('carta1', [menu1, menu2], singlePlates);

  const stock = new Stock('./tests/Stock/database_test.json');

  it('Add a Carta', () => {
    stock.addCarta(carta);
    expect(stock.getCartas()).to.be.eql([carta]);
  });
  it('Does not add a repeated carta', () => {
    stock.addCarta(carta);
    expect(stock.getCartas()).to.be.eql([carta]);
  });

  it('Added carta persists', () => {
    const newStock = new Stock('./tests/Stock/database_test.json');
    expect(newStock.getCartas()).to.deep.equalInAnyOrder([carta]);
  });

  it('removes a carta element', () => {
    stock.removeCarta('carta1');
    expect(stock.getCartas()).to.be.eql([]);
  });

  it('removes carta element from database', () => {
    const newStock = new Stock('./tests/Stock/database_test.json');
    expect(newStock.getCartas()).to.be.eql([]);
  });
});
