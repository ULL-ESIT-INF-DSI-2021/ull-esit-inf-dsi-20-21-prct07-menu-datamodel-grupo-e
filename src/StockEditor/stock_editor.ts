import { Stock } from "../Stock/Stock";
import * as inquirer from 'inquirer';
import { BasicFood, FoodGroup, Macronutrients } from "../Food";
import { Parser } from "../Parser";
import { jsonFood } from "../Stock";
import { Func } from "mocha";

export class StockEditor {
  private parser = new Parser();
  constructor(private stock: Stock) {
    inquirer.registerPrompt('recursive', require('inquirer-recursive'));
  }

  run() {
    this.promptMainMenu();
  }

  promptMainMenu() {
    
    const choices = {
      addFood: "Añadir alimento",
      removeFood: "Quitar alimento",
      quit: "Salir"
    };

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'list',
        name: 'choice',
        message: 'Elija una opción',
        choices: Object.values(choices)
      }
    ];

    const action = async (answers: any) => {
      switch (answers['choice']) {
        case choices.addFood:
          this.promptAddFood();
          break;
        case choices.removeFood:
          this.promptRemoveFood();
      }
    };

    inquirer.prompt(prompt).then(action);
  };

  
  async promptAddFood() {
    
    const prompt = [
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
      }];

    const action = (answers: any) => {
      answers.foods.forEach((food: jsonFood) => this.stock.addFood(this.parser.parseFood(food)));
    };

    // Donde poner los await? Aquí o fuera del promptAddFood?
    await inquirer.prompt(prompt).then(action);
  }

  async promptRemoveFood() {
    
    const foodNames = this.stock.getFoods().map((food) => food.getName());

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'checkbox',
        name: 'foodNames',
        message: 'Elija los alimentos a eliminar',
        choices: foodNames,
      }
    ];

    const action = (answers: any) => {
      console.log('Eliminando alimentos...');
      if (answers['foodNames']) {
        answers['foodNames'].forEach((foodName: string) => this.stock.deleteFood(foodName));
      }
    };

    await inquirer.prompt(prompt).then(action);
  }

  async promptAddPlate() {

  }

};
