import 'mocha';
import { expect } from 'chai';
import { Parser } from '../../src/Parser/index';
import { BasicFood, FoodGroup, Fruit, Cereal, RichProteinFood, Dairy, Vegetable } from "../../src/Food";
import { JsonCarta, JsonFood, JsonIngredient, JsonMenu, JsonPlate } from '../../src/Stock';
import { BasicPlate, FirstPlate, Ingredient, PlateType } from '../../src/Plate';
import deepEqualInAnyOrder = require('deep-equal-in-any-order');
import { Menu } from '../../src/Menu';
import { Carta } from '../../src/Carta';

describe('Parser tests', () => {
  it('Can be instanciated', () => {
    expect((new Parser()) instanceof Parser).to.be.true;
  });  

  it('ParseFood', () => {
    const parser = new Parser();
    const jsonfood :JsonFood = {
      name: `Papa`,
      origin: `Canarias`,
      priceByKg: 5,
      macronutrients: {
        lipids: 5,
        carbohydrates: 6,
        proteins: 2
      },
      type: FoodGroup.vegetables
    };

    const food :BasicFood = parser.parseFood(jsonfood);
    expect(food.getName()).to.be.eq('Papa');
    expect(food.getOrigin()).to.be.eq('Canarias');
    expect(food.getPriceByKg()).to.be.eq(5);
    expect(food.getMacronutrients()).to.be.eql(
        {
          lipids: 5,
          carbohydrates: 6,
          proteins: 2,
        }
    );
  });  

  it('ParseIngredient', () => {
    const parser = new Parser();
    const jsonPapa :JsonFood = {
      name: `Papa`,
      origin: `Canarias`,
      priceByKg: 5,
      macronutrients: {
        lipids: 5,
        carbohydrates: 6,
        proteins: 2
      },
      type: FoodGroup.vegetables
    };


    const jsonIngredient :JsonIngredient = {
      jsonFood: jsonPapa,
      ammount: 5 
    };

    const ingredientPapa :Ingredient = parser.parseIngredient(jsonIngredient);
    const food :BasicFood = ingredientPapa.getFood();
    expect(food.getName()).to.be.eq('Papa');
    expect(food.getOrigin()).to.be.eq('Canarias');
    expect(food.getPriceByKg()).to.be.eq(5);
    expect(food.getMacronutrients()).to.be.eql(
        {
          lipids: 5,
          carbohydrates: 6,
          proteins: 2,
        }
    );

    expect(ingredientPapa.getAmmount()).to.be.equal(5);

    expect(ingredientPapa.getPrice()).to.be.equal(0.025);

    expect(ingredientPapa.getNutritionalComposition()).to.be.deep.equalInAnyOrder(
        {
          lipids: 0.25,
          carbohydrates: 0.30000000000000004,
          proteins: 0.1,
        }
    );
  });
  
  it('ParsePlate', () => {
    const parser = new Parser();
    const jsonPapa :JsonFood = {
      name: `Papa`,
      origin: `Canarias`,
      priceByKg: 5,
      macronutrients: {
        lipids: 5,
        carbohydrates: 6,
        proteins: 2
      },
      type: FoodGroup.Fruits
    };
  
  
    const jsonIngredientPapa :JsonIngredient = {
      jsonFood: jsonPapa,
      ammount: 5 
    };
      
    const jsonPlate : JsonPlate = {
      name: `Papas cocinadas`,
      ingredients: [
        jsonIngredientPapa
      ],
      type: PlateType.firstPlate
    };

    const platePapa :BasicPlate = parser.parsePlate(jsonPlate);
    const ingredientPapa :Ingredient = (platePapa.getIngredients())[0];

    const food = ingredientPapa.getFood();
    expect(food.getName()).to.be.eq('Papa');
    expect(food.getOrigin()).to.be.eq('Canarias');
    expect(food.getPriceByKg()).to.be.eq(5);
    expect(food.getMacronutrients()).to.be.eql(
        {
          lipids: 5,
          carbohydrates: 6,
          proteins: 2,
        }
    );
  
    expect(ingredientPapa.getAmmount()).to.be.equal(5);
  
    expect(ingredientPapa.getPrice()).to.be.equal(0.025);
  
    expect(ingredientPapa.getNutritionalComposition()).to.be.deep.equalInAnyOrder(
        {
          lipids: 0.25,
          carbohydrates: 0.30000000000000004,
          proteins: 0.1,
        }
    );

    expect(platePapa.getName()).to.be.equal(`Papas cocinadas`);

    expect(platePapa.getFoodgroups()).to.be.deep.equal([FoodGroup.Fruits]);

    expect(platePapa.getPrice()).to.be.equal(0.025);

  }); 

  it('ParseMenu', () => {
    const parser = new Parser();
    const jsonPapa :JsonFood = {
      name: `Papa`,
      origin: `Canarias`,
      priceByKg: 5,
      macronutrients: {
        lipids: 5,
        carbohydrates: 6,
        proteins: 2
      },
      type: FoodGroup.vegetables
    };
  
  
    const jsonIngredientPapa :JsonIngredient = {
      jsonFood: jsonPapa,
      ammount: 5 
    };
      
    const jsonPlatePapa : JsonPlate = {
      name: `Papas cocinadas`,
      ingredients: [
        jsonIngredientPapa
      ],
      type: PlateType.firstPlate
    };

    const jsonMenu :JsonMenu = {
      name: `Menu basico`,
      price: 5,
      jsonPlates: [jsonPlatePapa]
    };


    const menuPapa :Menu = parser.parseMenu(jsonMenu, false);
    const platePapa :BasicPlate = menuPapa.getPlates()[0];
    const ingredientPapa :Ingredient = (platePapa.getIngredients())[0];

    const food = ingredientPapa.getFood();
    expect(food.getName()).to.be.eq('Papa');
    expect(food.getOrigin()).to.be.eq('Canarias');
    expect(food.getPriceByKg()).to.be.eq(5);
    expect(food.getMacronutrients()).to.be.eql(
        {
          lipids: 5,
          carbohydrates: 6,
          proteins: 2,
        }
    );
  
    expect(ingredientPapa.getAmmount()).to.be.equal(5);
  
    expect(ingredientPapa.getPrice()).to.be.equal(0.025);
  
    expect(ingredientPapa.getNutritionalComposition()).to.be.deep.equalInAnyOrder(
        {
          lipids: 0.25,
          carbohydrates: 0.30000000000000004,
          proteins: 0.1,
        }
    );

    expect(platePapa.getName()).to.be.equal(`Papas cocinadas`);

    expect(platePapa.getFoodgroups()).to.be.deep.equal([FoodGroup.Fruits]);

    expect(platePapa.getPrice()).to.be.equal(0.025);

    expect(menuPapa.getName()).to.be.equal("Menu basico");

  }); 

  it('ParseJsonFood', () => {
    const parser = new Parser();
    const Papa :BasicFood = new Vegetable(
        `Papa`,
        `Canarias`,
        5,
        {
          lipids: 5,
          carbohydrates: 6,
          proteins: 2
        }
    );

    const jsonPapa :JsonFood = parser.parseJsonFood(Papa);
    expect(jsonPapa).to.be.deep.equalInAnyOrder(
        {
          name: `Papa`,
          origin: `Canarias`,
          priceByKg: 5,
          macronutrients: {
            lipids: 5,
            carbohydrates: 6,
            proteins: 2
          },
          type: FoodGroup.vegetables
        }
    );
    
  });  


  it('ParseJsonIngredient', () => {
    const parser = new Parser();
    const Papa :BasicFood = new Vegetable(
        `Papa`,
        `Canarias`,
        5,
        {
          lipids: 5,
          carbohydrates: 6,
          proteins: 2
        }
    );

    const ingredientPapa :Ingredient = new Ingredient(
        Papa,
        4
    );

    const jsonIngredientPapa :JsonIngredient = parser.parseJsonIngredient(ingredientPapa);
    expect(jsonIngredientPapa).to.be.deep.equalInAnyOrder(
        {
          ammount: 4,
          jsonFood: {
            macronutrients: {
              carbohydrates: 6,
              lipids: 5,
              proteins: 2,
            },
            name: "Papa",
            origin: "Canarias",
            priceByKg: 5,
            type: "Verduras y hortalizas."
          }
        }
    );
    
  });  


  it('ParseJsonPlate', () => {
    const parser = new Parser();
    const Papa :BasicFood = new Vegetable(
        `Papa`,
        `Canarias`,
        5,
        {
          lipids: 5,
          carbohydrates: 6,
          proteins: 2
        }
    );

    const ingredientPapa :Ingredient = new Ingredient(
        Papa,
        4
    );
    const platePapa :BasicPlate = new FirstPlate(
        `Papas Cocinadas`,
        ingredientPapa
    );

    const jsonPlatePapa :JsonPlate = parser.parseJsonPlate(platePapa);
    expect(jsonPlatePapa).to.be.deep.equalInAnyOrder(
        {
          ingredients: [
            {
              ammount: 4,
              jsonFood: {
                macronutrients: {
                  carbohydrates: 6,
                  lipids: 5,
                  proteins: 2
                },
                name: "Papa",
                origin: "Canarias",
                priceByKg: 5,
                type: "Verduras y hortalizas."
              }
            }
          ],
          name: "Papas Cocinadas",
          type: "Primer plato"
        }
    );
    
  });  

  it('ParseJsonMenu', () => {
    const parser = new Parser();
    const Papa :BasicFood = new Vegetable(
        `Papa`,
        `Canarias`,
        5,
        {
          lipids: 5,
          carbohydrates: 6,
          proteins: 2
        }
    );

    const ingredientPapa :Ingredient = new Ingredient(
        Papa,
        4
    );
    const platePapa :BasicPlate = new FirstPlate(
        `Papas Cocinadas`,
        ingredientPapa
    );
    
    const menuPapa :Menu = new Menu(
        `Menu Basico`,
        [platePapa],
        false
    );

    const jsonMenuPapa :JsonMenu = parser.parseJsonMenu(menuPapa);
    expect(jsonMenuPapa).to.be.deep.equalInAnyOrder(
        {
          jsonPlates: [
            {
              ingredients: [
                {
                  ammount: 4,
                  jsonFood: {
                    macronutrients: {
                      carbohydrates: 6,
                      lipids: 5,
                      proteins: 2,
                    },
                    name: "Papa",
                    origin: "Canarias",
                    priceByKg: 5,
                    type: "Verduras y hortalizas."
                  }
                }
              ],
              name: "Papas Cocinadas",
              type: "Primer plato"
            }
          ],
          name: "Menu Basico",
          price: 0.02
        }
    );
    
  });  


  it('ParseJsonCarta', () => {
    const parser = new Parser();
    const Papa :BasicFood = new Vegetable(
        `Papa`,
        `Canarias`,
        5,
        {
          lipids: 5,
          carbohydrates: 6,
          proteins: 2
        }
    );

    const ingredientPapa :Ingredient = new Ingredient(
        Papa,
        4
    );
    const platePapa :BasicPlate = new FirstPlate(
        `Papas Cocinadas`,
        ingredientPapa
    );
    
    const menuPapa :Menu = new Menu(
        `Menu Basico`,
        [platePapa],
        false
    );

    const cartaPapa :Carta = new Carta(
        `Carta basica`,
        [menuPapa],
        [platePapa]
    );
    const jsonCartaPapa :JsonCarta = parser.parseJsonCarta(cartaPapa);
    expect(jsonCartaPapa).to.be.deep.equalInAnyOrder(
        {
          menus: [
            {
              jsonPlates: [
                {
                  ingredients: [
                    {
                      ammount: 4,
                      jsonFood: {
                        macronutrients: {
                          carbohydrates: 6,
                          lipids: 5,
                          proteins: 2,
                        },
                        name: "Papa",
                        origin: "Canarias",
                        priceByKg: 5,
                        type: "Verduras y hortalizas."
                      }
                    }
                  ],
                  name: "Papas Cocinadas",
                  type: "Primer plato"
                }
              ],
              name: "Menu Basico",
              price: 0.02
            }
          ],
          name: "Carta basica",
          singlePlates: [
            {
              ingredients: [
                {
                  ammount: 4,
                  jsonFood: {
                    macronutrients: {
                      carbohydrates: 6,
                      lipids: 5,
                      proteins: 2
                    },
                    name: "Papa",
                    origin: "Canarias",
                    priceByKg: 5,
                    type: "Verduras y hortalizas."
                  }
                }
              ],
              name: "Papas Cocinadas",
              type: "Primer plato"
            }
          ]
        }
    );
    
  });  

});
