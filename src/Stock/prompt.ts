import { Stock, jsonFood } from "./index";
import * as inquirer from 'inquirer';
import 'colors';
import { BasicFood, Cereal, FoodGroup, Fruit, RichProteinFood, Macronutrients } from '../Food';
import Prompt = require("inquirer/lib/prompts/base");

enum Commands {
  DisplayFood = "Show Foods",
  AddFood = "Add Food",
  Quit = "Quit",
}

class PromptStock {
  constructor(private stock_ :Stock) {}

  promptMenu() {
    console.clear();
    inquirer.prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands)
    }).then((answers) => {
      switch (answers["command"]) {
        case Commands.DisplayFood:
          this.promptFoodView();
          break;
        case Commands.AddFood:
          this.promptAddFood();
          this.promptMenu();
          break;
      }
    });
  };

  promptFoodView() {
    console.clear();
    this.stock_.displayFoods();
    inquirer.prompt({
      type: "list",
      name: "command",
      message: "option",
      choices: Object.values(Commands)
    }).then((answers) => {
      switch (answers["command"]) {
        case Commands.Quit:
          this.promptMenu();
          break;
      }
    });
  }


  promptAddFood() {
    const foods: BasicFood[] = [];
    const stock = this.stock_;
    inquirer.registerPrompt('recursive', require('inquirer-recursive'));
    inquirer.prompt([
      {
        type: 'recursive',
        message: 'Add new food',
        name: 'foods',
        prompts: [
          {
            type: 'list',
            name: 'type',
            message: 'Tipo de alimento',
            choices: Object.values(FoodGroup),
          },
          {
            type: 'input',
            name: 'name',
            message: 'Nombre del alimento?',
          },

          {
            type: 'input',
            name: 'origin',
            message: 'origen?',
          },

          {
            type: 'input',
            name: 'priceByKg',
            message: 'Precio por Kg?',
            validate: function(priceByKg: string) {
              return isNaN(parseFloat(priceByKg)) ? 'Introduzca un número' : true;
            },
            filter: function(priceByKg: string) {
              return isNaN(parseFloat(priceByKg)) ? priceByKg : parseFloat(priceByKg);
            }
          },

          {
            type: 'input',
            name: 'macronutrients',
            message: 'Macronutrientes (lípidos, carbohidratos y proteínas) separados por coma',
            filter: function(macronutrients: string) {
              const values = macronutrients.split(',').map((v) => parseFloat(v));
              return new Macronutrients(values[0], values[1], values[2]);
            }
          },

        ]
      }]).then(function(answers) {

      // console.log(answers);
      answers.foods.forEach((food: jsonFood) => {
        switch (food.type) {
          case FoodGroup.Fruits:
            // eslint-disable-next-line no-invalid-this
            foods.push(new Fruit(food.name, food.origin, food.price, food.macronutrients));
            break;
          case FoodGroup.Cereals:
            // eslint-disable-next-line no-invalid-this
            foods.push(new Cereal(food.name, food.origin, food.price, food.macronutrients));
            break;
          case FoodGroup.proteinRich:
            // eslint-disable-next-line no-invalid-this
            foods.push(new RichProteinFood(food.name, food.origin, food.price, food.macronutrients));
            break;
          case FoodGroup.Cereals:
            // eslint-disable-next-line no-invalid-this
            foods.push(new Cereal(food.name, food.origin, food.price, food.macronutrients));
            break;
        }
      });
      console.log(foods);
      foods.forEach((food) => {
        stock.addFood(food);
      });
  
    });
  }
  run() {
    this.promptMenu();
  }
};

const stockTest :Stock = new Stock('database');
stockTest.addFood(new Fruit("Papaya", "Brasil", 3, {lipids: 3, carbohydrates: 6, proteins: 5}));

const myPrompt :PromptStock = new PromptStock(stockTest);

myPrompt.run();
