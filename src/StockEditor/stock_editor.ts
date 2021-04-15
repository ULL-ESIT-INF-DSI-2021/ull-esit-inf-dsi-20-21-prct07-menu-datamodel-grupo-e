import { Stock } from "../Stock/Stock";
import * as inquirer from 'inquirer';
import { BasicFood, FoodGroup, Macronutrients } from "../Food";
import { Parser } from "../Parser";
import { JsonFood, JsonPlate } from "../Stock";
import { BasicPlate, Ingredient, PlateType } from "../Plate";
import * as clone from 'clone';
import { Menu } from "../Menu";

export class StockEditor {
  private parser = new Parser();
  constructor(private stock: Stock) {
    inquirer.registerPrompt('recursive', require('inquirer-recursive'));
  }

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {

    const choices = {
      addFood: "Añadir alimento",
      modifyFood: "Modificar Alimento",
      removeFood: "Quitar alimento",

      addPlate: "Añadir plato",
      // modifyPlate: "Modificar plato",
      removePlate: "Quitar plato",

      addMenu: "Añadir menú",
      // modifyMenu: "Modificar menú",
      removeMenu: "Quitar menú",

      quit: "Volver"
    };


    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'list',
        name: 'choice',
        message: 'Elija una opción',
        choices: Object.values(choices)
      }
    ];
    let quit = false;
    const action = async (answers: any) => {
      switch (answers['choice']) {
    
        case choices.addFood:
          await this.promptAddFood();
          break;
        case choices.removeFood:
          await this.promptRemoveFood();
          break;
        case choices.modifyFood:
          await this.modifyFood();
          break;

        case choices.addPlate:
          await this.promptAddPlate();
          break;
        case choices.removePlate:
          await this.promptRemovePlate();
          break;
    
        case choices.addMenu:
          await this.promptAddMenu();
          break;
        case choices.removeMenu:
          await this.promptRemoveMenu();
    
        case choices.quit:
          quit = true;
          break;
      }
    };

    await inquirer.prompt(prompt).then(action);
    if (quit) return;
    await this.promptMainMenu();
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
      console.log('FOODS:', answers.foods);
      answers.foods.forEach((food: JsonFood) => this.stock.addFood(this.parser.parseFood(food)));
    };

    // Donde poner los await? Aquí o fuera del promptAddFood?
    await inquirer.prompt(prompt).then(action);
  }

  async modifyFood() {
    const foodNames = this.stock.getFoods().map((food) => food.getName());

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'list',
        name: 'foodName',
        message: 'Elija el alimento a modificar',
        choices: foodNames,
      }
    ];


    const action = async (answer: any) => {
      await this.modifyFoodPrompt(answer['foodName']);
    };

    await inquirer.prompt(prompt).then(action);

  }

  async modifyFoodPrompt(foodName: string) {
    const food: BasicFood = this.stock.searchFoodByname(foodName);
    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'input',
        name: 'name',
        default: food.getName(),
        message: 'Nombre del alimento?',
      },
      {
        type: 'input',
        name: 'origin',
        default: food.getOrigin(),
        message: 'origen?',
      },
      {
        type: 'input',
        name: 'priceByKg',
        message: 'Precio por Kg?',
        default: food.getPriceByKg(),
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
        default: Object.values(food.getMacronutrients()).join(','),
        message: 'Macronutrientes (lípidos, carbohidratos y proteínas) separados por coma',
        filter: function(macronutrients: string) {
          const values = macronutrients.split(',').map((v) => parseFloat(v));
          return new Macronutrients(values[0], values[1], values[2]);
        }
      },
    ];

    const action = (answers: any) => {
      const modifiedFood = this.parser.parseFood({
        type: food.getFoodGroup(),
        name: answers['name'],
        origin: answers['origin'],
        macronutrients: answers['macronutrients'],
        priceByKg: answers['priceByKg']
      });

      this.stock.deleteFood(foodName);
      this.stock.addFood(modifiedFood);
    };

    await inquirer.prompt(prompt).then(action);
  };

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
    let choices: string[] = Object.values(PlateType);
    choices = choices.concat('Volver');

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'list',
        name: 'type',
        message: 'Tipo de plato',
        choices: choices,
      },
      {
        type: 'input',
        name: 'name',
        message: 'Nombre del plato?',
        when: (answers: any) => answers['type'] !== 'Volver',
      },
    ];

    const action = async (answers: any) => {
      if (answers['type'] === 'Volver') return;

      const jsonFood: JsonPlate = { name: answers['name'], type: answers['type'], ingredients: [] };
      const newPlate = this.parser.parsePlate(jsonFood);

      console.log('\nIngrese los ingredientes:\n');
      await this.promptIngredientsFor(newPlate);

      this.stock.addPlate(newPlate);
    };

    await inquirer.prompt(prompt).then(action);

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
            name: 'foodName',
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
      answers['ingredients'].forEach((ingredient: { foodName: string, ammount: number }) => {
        plate.addIngredient(new Ingredient(this.stock.searchFoodByname(ingredient.foodName), ingredient.ammount));
      });
    };

    await inquirer.prompt(prompt).then(action);
  }

  async promptRemovePlate() {
    const plateNames = this.stock.getPlates().map((plate) => plate.getName());

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'checkbox',
        name: 'plateNames',
        message: 'Elija los Platos a eliminar',
        choices: plateNames,
      }
    ];

    const action = (answers: any) => {
      console.log('Eliminando platos...');
      if (answers['plateNames']) {
        answers['plateNames'].forEach((plateName: string) => this.stock.deletePlate(plateName));
      }
    };

    await inquirer.prompt(prompt).then(action);
  }


  async promptAddMenu() {

    const prompt = [
      {
        type: 'input',
        message: 'Nombre del nuevo menú',
        name: 'menuName',
      },
      {
        type: 'checkbox',
        message: 'Seleccione los platos que contendrá el menú',
        name: 'plates',
        choices: this.stock.getPlates().map((plate) => plate.getName()),
      }
    ];

    const action = (answers: any) => {
      const plates = answers['plates'].map((plateName: string) => this.stock.searchPlateByName(plateName));
      this.stock.addMenu(new Menu(answers['menuName'], ...plates));
    };

    // Donde poner los await? Aquí o fuera del promptAddFood?
    await inquirer.prompt(prompt).then(action);
  }

  async promptRemoveMenu() {
    const menuNames = this.stock.getMenus().map((Menu) => Menu.getNameOfMenu());

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'checkbox',
        name: 'Menus',
        message: 'Elija los menus a eliminar',
        choices: menuNames,
      }
    ];

    const action = (answers: any) => {
      console.log('Eliminando alimentos...');
      if (answers['foodNames']) {
        answers['foodNames'].forEach((foodName: string) => this.stock.deleteFood(foodName));
      }
    };

    await inquirer.prompt(prompt).then(action);
  };

};
