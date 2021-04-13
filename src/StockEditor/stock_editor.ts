import { Stock } from "../Stock/Stock";
import * as inquirer from 'inquirer';
import { BasicFood, FoodGroup, Macronutrients } from "../Food";
import { Parser } from "../Parser";
import { JsonFood, JsonPlate } from "../Stock";
import { Func } from "mocha";
import { BasicPlate, Ingredient, PlateType } from "../Plate";

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
      addPlate: "Añadir plato",
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
          break;
        case choices.addPlate:
          this.promptAddPlate();
          break;
      }
    };

    inquirer.prompt(prompt).then(action);
  };


  async promptAddFood() {

    const prompt = [
      {
        type: 'recursive',
        message: 'Añadir nuevo alimento',
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
      answers.foods.forEach((food: JsonFood) => this.stock.addFood(this.parser.parseFood(food)));
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
    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'list',
        name: 'type',
        message: 'Tipo de plato',
        choices: Object.values(PlateType),
      },
      {
        type: 'input',
        name: 'name',
        message: 'Nombre del plato?',
      },
    ];

    const action = async (answers: any) => {
      const jsonFood: JsonPlate = {name: answers['name'], type: answers['type'], ingredients: []};
      const newPlate = this.parser.parsePlate(jsonFood);

      console.log('\nIngrese los ingredientes:\n');
      await this.promptIngredientsFor(newPlate);
      
      this.stock.addPlate(newPlate);
    };

    inquirer.prompt(prompt).then(action);

  }

  async promptIngredientsFor(plate: BasicPlate) {
    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'recursive',
        message: `Ingrese los ingredientes para el plato ${plate.getName()}`,
        name: 'ingredients',
        prompts: [
          {
            type: 'list',
            name: 'name',
            message: 'Seleccione un alimento:',
            choices: this.stock.getFoods().map((food) => food.getName()),
          },
          {
            type: 'input',
            name: 'ammount',
            message: 'Cantidad en gramos:',
            validate: function(ammount: string) {
              return isNaN(parseFloat(ammount)) ? 'Introduzca un número' : true;
            },
            filter: function(ammount: string) {
              return isNaN(parseFloat(ammount)) ? ammount : parseFloat(ammount);
            }
          }
        ],
      },
    ];

    const action = (answers: any) => {
      answers['ingredients'].forEach((ingredient: {name: string, ammount: number}) => {
        plate.addIngredient(new Ingredient(this.stock.searchFoodByname(ingredient.name), ingredient.ammount));
      });
    };

    await inquirer.prompt(prompt).then(action);
  }

};
