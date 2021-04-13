import { Stock, jsonFood } from "./index";
import * as inquirer from 'inquirer';
import 'colors';
import { BasicFood, Cereal, FoodGroup, Fruit, RichProteinFood, Macronutrients } from '../Food';
import Prompt = require("inquirer/lib/prompts/base");
import { Parser } from "../Parser";

enum Commands {
  DisplayFood = "Show Foods",
  AddFood = "Add Food",
  Quit = "Quit",
}

class App {
  private stock = new Stock('./src/Stock/database.json');
  private prompt: PromptStock;

  constructor() {
    this.prompt = new PromptStock(this.stock);
  }

  async run() {
    await this.prompt.menu();
  }


}
class PromptStock {
  constructor(private stock: Stock) {}

  async menu() {
    console.clear();
    inquirer.prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands)
    }).then(async (answers) => {
      switch (answers["command"]) {
        case Commands.DisplayFood:
          this.promptFoodView();
          break;
        case Commands.AddFood:
          await this.addFood();
          this.menu();
          break;
      }
    });
  };

  async promptFoodView() {
    console.clear();
    await this.stock.displayFoods();
    inquirer.prompt({
      type: "list",
      name: "command",
      message: "option",
      choices: Object.values(Commands)
    }).then((answers) => {
      switch (answers["command"]) {
        case Commands.Quit:
          this.menu();
          break;
      }
    });
  }


  async addFood() {
    const foodsToBeAdded: BasicFood[] = [];
    const parser = new Parser();
    
    inquirer.registerPrompt('recursive', require('inquirer-recursive'));
    await inquirer.prompt([
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
      answers.foods.forEach((food: jsonFood) => foodsToBeAdded.push(parser.parseFood(food)));
    });
    console.log('FOODS: ', foodsToBeAdded);
    foodsToBeAdded.forEach((food) => this.stock.addFood(food));
  }
};


const app = new App();

app.run();
