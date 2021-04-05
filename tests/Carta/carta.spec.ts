import 'mocha';
import { expect } from 'chai';
import deepEqualInAnyOrder = require('deep-equal-in-any-order');
import chai = require('chai');
import { Menu } from '../../src/Menu';
import { Dessert, FirstPlate, Ingredient, SecondPlate, StarterPlate } from '../../src/Plate';
import { Cereal, Fruit, Macronutrients, Meat, Vegetable } from '../../src/Food';
import { Carta } from '../../src/Carta';

chai.use(deepEqualInAnyOrder);

describe('Carta tests', () => {
  const menu1 = new Menu(
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
              new Meat('Costillas', 'Brasil', 12, new Macronutrients()),
              1
          )
      ),
  );
  const menu2 = new Menu(
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
              new Meat('Costillas', 'Brasil', 12, new Macronutrients()),
              1
          )
      ),
  );

  const singlePlates = [
    new FirstPlate('Carne fiesta', new Ingredient(new Meat('Cerdo', 'Canarias', 7, new Macronutrients()), 1)),
    new Dessert('Applepie', new Ingredient(new Fruit('manzana', 'Tacoronte', 3, new Macronutrients()), 250))
  ];

  const carta = new Carta([menu1, menu2], singlePlates);

  it('It can be instanciated', () => {
    expect(carta instanceof Carta).to.be.true;
  });

  it('Retrieves ALL plates', () => {
    expect(carta.getAllPlates()).to.deep.equalInAnyOrder(
        [
          new StarterPlate('Entrante', new Ingredient(new Fruit('Pera', 'Tacoronte', 3, new Macronutrients()), 1)),
          new FirstPlate('PrimerPlato2', new Ingredient(new Cereal('Avena', 'Madrid', 3, new Macronutrients()),2)),
          new FirstPlate('Carne fiesta', new Ingredient(new Meat('Cerdo', 'Canarias', 7, new Macronutrients()), 1)),
          new FirstPlate('PrimerPlato', new Ingredient(new Vegetable('Zanahora', 'Galicia', 3, new Macronutrients()), 1)),
          new SecondPlate('SegundoPlato', new Ingredient(new Meat('Costillas', 'Brasil', 12, new Macronutrients()), 1)),
          new SecondPlate('SegundoPlato2', new Ingredient(new Meat('Costillas', 'Brasil', 12, new Macronutrients()), 1)),
          new Dessert('Applepie', new Ingredient(new Fruit('manzana', 'Tacoronte', 3, new Macronutrients()), 250)),
          new Dessert('Postre', new Ingredient( new Fruit('Pera', 'Tacoronte', 3, new Macronutrients()), 1)),
        ]
    );
  });
});