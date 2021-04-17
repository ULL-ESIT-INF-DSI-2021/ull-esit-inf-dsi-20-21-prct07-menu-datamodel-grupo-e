import { Stock } from "../Stock/Stock";
import * as inquirer from 'inquirer';
import { BasicFood, FoodGroup, Macronutrients } from "../Food";
import { Parser } from "../Parser";
import { JsonFood, JsonPlate } from "../Stock";
import { BasicPlate, Ingredient, PlateType } from "../Plate";
import * as clone from 'clone';
import { Menu } from "../Menu";
import 'colors';
import { CartasHolder, FoodsHolder, MenusHolder, Nameable, OriginHolder, PlatesHolder, PriceByKgHolder } from "../Interfaces";
import { IngredientsHolder } from "../Interfaces/ingredients_holder";
import { Carta } from "../Carta";

export class StockEditor {
  private parser = new Parser();
  constructor(private stock: Stock) {
    inquirer.registerPrompt('recursive', require('inquirer-recursive'));
  }

  /**
   * Arranca el editor de inventario
   */
  async run() {
    await this.promptMainMenu();
  }

  /**
   * Ofrece al usuario todas las opciones de edición del Stock
   */
  async promptMainMenu() {

    const choices = {
      addFood: "Añadir alimento".blue,
      modifyFood: "Modificar Alimento".blue,
      removeFood: "Quitar alimento".blue,

      addPlate: "Añadir plato".green,
      modifyPlate: "Modificar plato".green,
      removePlate: "Quitar plato".green,

      addMenu: "Añadir menú".yellow,
      modifyMenu: "Modificar menú".yellow,
      removeMenu: "Quitar menú".yellow,

      addCarta: "Añadir carta".red,
      modifyCarta: "Modificar carta".red,
      removeCarta: "Quitar carta".red,

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
        // Food options
        case choices.addFood:
          await this.promptNewFoodsFor(this.stock);
          break;
        case choices.removeFood:
          await this.promptRemoveFoodsFrom(this.stock);
          break;
        case choices.modifyFood:
          await this.promptModifyFoodFrom(this.stock);
          break;

        // Plate options
        case choices.addPlate:
          await this.promptNewPlateFor(this.stock);
          break;
        case choices.removePlate:
          await this.promptRemovePlatesFrom(this.stock);
          break;
        case choices.modifyPlate:
          await this.promptModifyPlateFrom(this.stock);
          break;

        // Menu options
        case choices.addMenu:
          await this.promptNewMenuFor(this.stock);
          break;
        case choices.removeMenu:
          await this.promptRemoveMenusFrom(this.stock);
          break;
        case choices.modifyMenu:
          await this.promptModifyMenuFrom(this.stock);
          break;

        // Carta options
        case choices.addCarta:
          await this.promptNewCartaFor(this.stock);
          break;
        case choices.removeCarta:
          await this.promptRemoveCartasFrom(this.stock);
          break;
        case choices.modifyCarta:
          await this.promptModifyCartaFrom(this.stock);
          break;
        case choices.quit:
          quit = true;
          break;
      }
    };

    await inquirer.prompt(prompt).then(action);
    if (quit) return;
    await this.promptMainMenu();
  };

  // FoodsHolders
  /**
   * Permite al usuario introducir alimentos y almacenarlos en `foodsReceiver`
   * @param foodsReceiver Objeto que implementa la interfaz `FoodsHolder`
   */
  async promptNewFoodsFor(foodsReceiver: FoodsHolder) {

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
      answers.foods.forEach((food: JsonFood) => foodsReceiver.addFood(this.parser.parseFood(food)));
    };

    await inquirer.prompt(prompt).then(action);
  }

  /**
   * Permite al usuario elegir alimentos del stock y almacenarlos en `foodsReceiver`
   * @param foodsReceiver Objeto que implementa la interfaz `FoodsHolder`
   */
  async promptExistentFoodsFor(foodsReceiver: FoodsHolder) {
    const choices = this.stock.getFoods().map((food) => food.getName());
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      name: 'foodNames',
      message: 'Seleccione los alimentos a añadir:',
      choices: choices,
    };
    const action = (answers: any) => answers.foodNames.forEach((foodName: string) => foodsReceiver.addFood(this.stock.searchFoodByName(foodName)));
    await inquirer.prompt(prompt).then(action);
  }
 
  /**
   * Permite al usuario eliminar alimentos del objeto `foodsHolder`
   * @param foodsHolder Objeto que implementa la interfaz `FoodsHolder`
   */
  async promptRemoveFoodsFrom(foodsHolder: FoodsHolder) {

    const foodNames = foodsHolder.getFoods().map((food) => food.getName());

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
        answers['foodNames'].forEach((foodName: string) => foodsHolder.removeFood(foodName));
      }
    };

    await inquirer.prompt(prompt).then(action);
  }
  
  /**
   * Permite al usuario editar un alimento almacenado en foodsHolder
   * @param foodsHolder Objeto que implementa la interfaz `FoodsHolder`
   */
  async promptModifyFoodFrom(foodsHolder: FoodsHolder) {
    let quit = false;

    // Elegir el alimento a modificar
    let foodToEdit: BasicFood;
    let oldFoodName: string;

    await inquirer.prompt(
        {
          type: 'list',
          name: 'foodName',
          choices: foodsHolder.getFoods().map((food) => food.getName()).concat(['Volver']),
        }).then((answers: any) => {
      if (answers.foodName === 'Volver') {
        quit = true;
      } else {
        foodToEdit = clone(foodsHolder.searchFoodByName(answers.foodName));
        oldFoodName = foodToEdit.getName();
      }
    });

    // Si el usuario selecciona la opción 'Volver' se termina la función
    if (quit) return;

    // Elegir el tipo de modificación
    const choices = {
      changeName: 'Cambiar nombre.',
      changeOrigin: 'Cambiar origen.',
      changePrice: 'Cambiar precio.',
      changeMacronutrients: 'Cambiar macronutrientes.',
      quit: 'Volver',
    };

    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      message: 'Seleccione una opción',
      name: 'choice',
      choices: Object.values(choices),
    };

    const action = async (answers: any) => {
      switch (answers.choice) {
        case choices.changeName:
          await this.promptNewNameFor(foodToEdit);
          break;
        case choices.changeOrigin:
          await this.promptNewOriginFor(foodToEdit);
          break;
        case choices.changePrice:
          await this.promptNewPriceByKgFor(foodToEdit);
          break;
      }
      foodsHolder.removeFood(oldFoodName);
      foodsHolder.addFood(foodToEdit);
    };

    await inquirer.prompt(prompt).then(action);
  }


  // PlatesHolders
  /**
   * Permite al usuario introducir un nuevo plato y almacenarlos en `plateReceiver`
   * @param plateReceiver Objeto que implementa la interfaz `PlatesHolder`
   */
  async promptNewPlateFor(plateReceiver: PlatesHolder) {
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
        when: (answers: any) => answers['type'] !== 'Volver', // Este prompt solo aparece cuando el usuario no ha seleccionado la opción volver
      },
    ];

    const action = async (answers: any) => {
      // Si el usuario ha seleccionado la opción volver la función termina
      if (answers['type'] === 'Volver') return;

      const jsonFood: JsonPlate = { name: answers['name'], type: answers['type'], ingredients: [] };
      const newPlate = this.parser.parsePlate(jsonFood);

      await this.promptNewIngredientsFor(newPlate);

      plateReceiver.addPlate(newPlate);
    };

    await inquirer.prompt(prompt).then(action);

  }

  /**
  * Permite al usuario seleccionar platos almacenados en Sotck y almacenarlos en `platesReceiver`
  * @param platesReceiver Objeto que implementa la interfaz `PlatesHolder`
  */
  async promptExistentPlatesFor(platesReceiver: PlatesHolder) {
    const choices = this.stock.getPlates().map((plate) => plate.getName());
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'checkbox',
      name: 'plateNames',
      choices: choices
    };

    const action = (answers: any) => {
      answers.plateNames.forEach((plateName: string) => platesReceiver.addPlate(this.stock.searchPlateByName(plateName)));
    };

    await inquirer.prompt(prompt).then(action);
  }

  /**
  * Permite al usuario eliminar platos almacenados en `platesHolder`
  * @param platesHolder Objeto que implementa la interfaz `PlatesHolder`
  */
  async promptRemovePlatesFrom(platesHolder: PlatesHolder) {
    const choices = platesHolder.getPlates().map((plate) => plate.getName());

    const prompt: inquirer.QuestionCollection<any> = {
      type: 'checkbox',
      message: 'Elija los platos a quitar',
      name: 'plateNames',
      choices: choices,
    };

    const action = (answers: any) => {
      answers.plateNames.forEach((plateName: string) => platesHolder.removePlate(plateName));
    };

    await inquirer.prompt(prompt).then(action);
  }

  /**
  * Permite al usuario modificar un plato almacenado en `platesHolder`
  * @param platesHolder Objeto que implementa la interfaz `PlatesHolder`
  */
  async promptModifyPlateFrom(platesHolder: PlatesHolder) {
    let quit = false;

    // Elegir el plato a modificar
    let plateToEdit: BasicPlate;
    let oldPlateName: string;

    await inquirer.prompt(
        {
          type: 'list',
          name: 'plateName',
          choices: platesHolder.getPlates().map((plate) => plate.getName()).concat(['Volver']),
        }).then((answers: any) => {
      if (answers.plateName === 'Volver') {
        quit = true;
      } else {
        plateToEdit = clone(platesHolder.searchPlateByName(answers.plateName));
        oldPlateName = plateToEdit.getName();
      }
    });

    // Si el usuario eligió la opción 'Volver' se termina la función
    if (quit) return;

    // Elegir el tipo de modificación
    const choices = {
      changeName: 'Cambiar nombre',
      addIngredients: 'Añadir ingredientes.',
      removeIngredients: 'Quitar ingredientes.',
      quit: 'Volver',
    };

    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      message: 'Seleccione una opción',
      name: 'choice',
      choices: Object.values(choices),
    };

    const action = async (answers: any) => {
      switch (answers.choice) {
        case choices.changeName:
          await this.promptNewNameFor(plateToEdit);
          break;
        case choices.addIngredients:
          await this.promptNewIngredientsFor(plateToEdit);
          break;
        case choices.removeIngredients:
          await this.promptRemoveIngredientsFrom(plateToEdit);
          break;
      }
      this.stock.removePlate(oldPlateName);
      this.stock.addPlate(plateToEdit);
    };

    await inquirer.prompt(prompt).then(action);
  }
  
  // OriginHolder
  /**
  * Permite al usuario cambiar el origen de `originHolder`
  * @param originHolder Objeto que implementa la interfaz `OriginHolder`
  */
  async promptNewOriginFor(originHolder: OriginHolder) {
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'input',
      name: 'newOrigin',
      default: originHolder.getOrigin(),
      message: `Nuevo nombre (${originHolder.getOrigin()}):`,
    };

    const action = (answers: any) => {
      originHolder.setOrigin(answers.newOrigin);
    };

    await inquirer.prompt(prompt).then(action);
  }

  // MenusHolders
  /**
  * Permite al usuario añadir un nuevo menú a `menuReceiver`
  * @param menuReceiver Objeto que implementa la interfaz `MenusHolder`
  */
  async promptNewMenuFor(menuReceiver: MenusHolder) {
    
    let goodMenuConfig = true;
    do {
      try {
        goodMenuConfig = true;
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
          menuReceiver.addMenu(new Menu(answers['menuName'], plates));
        };
    
        await inquirer.prompt(prompt).then(action);
      } catch (error) {
        // Nos aseguramos de que el menú tenga una configuración adecuada
        goodMenuConfig = false;
        console.log(`Introduzca una configuración válida para el menú: un plato de cada categoría o, al menos, tres de ellas.`);
      }
      
    } while (!goodMenuConfig);
  }

  /**
   * Permite al usuario añadir una serie de menús almacenados en Stock a `menusReceiver`
   * @param menusReceiver Objeto que implementa la interfaz `MenusHolder`
   */
  async promptExistentMenusFor(menusReceiver: MenusHolder) {
    const menuNames = this.stock.getMenus().map((menu) => menu.getName());
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'checkbox',
      message: 'Seleccione los menús a añadir',
      name: 'menuNames',
      choices: menuNames,
    };

    const action = (answers: any) => {
      answers.menuNames.forEach((menuName: string) => menusReceiver.addMenu(this.stock.searchMenuByName(menuName)));
    };

    await inquirer.prompt(prompt).then(action);
  }

  /**
   * Permite al usuario eliminar una serie de menús almacenados en `menusHolder`
   * @param menusHolder Objeto que implementa la interfaz `MenusHolder`
   */
  async promptRemoveMenusFrom(menusHolder: MenusHolder) {
    const menuNames = menusHolder.getMenus().map((Menu) => Menu.getName());

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'checkbox',
        name: 'menuNames',
        message: 'Elija los menus a eliminar',
        choices: menuNames,
      }
    ];

    const action = (answers: any) => {
      console.log('Eliminando menús...');
      if (answers['menuNames']) {
        answers['menuNames'].forEach((menuName: string) => menusHolder.removeMenu(menuName));
      }
    };

    await inquirer.prompt(prompt).then(action);
  }

  /**
   * Permite al usuario editar un menú almacenado en `menusHolder`
   * @param menusHolder Objeto que implementa la interfaz `MenusHolder`
   */
  async promptModifyMenuFrom(menusHolder: MenusHolder) {

    // Elegir el menú a editar
    let menuToEdit: Menu;
    let oldMenuName: string;
    await inquirer.prompt(
        {
          type: 'list',
          name: 'menuName',
          choices: menusHolder.getMenus().map((menu) => menu.getName()),
        }
    ).then((answers: any) => {
      menuToEdit = clone(menusHolder.searchMenuByName(answers.menuName));
      oldMenuName = menuToEdit.getName();
    });

    // Elegir el tipo de modificación
    const choices = {
      changeName: 'Cambiar nombre',
      addExistentPlates: 'Añadir platos existentes.',
      addNewPlate: 'Añadir nuevo plato.',
      removePlates: 'Quitar platos.',
      quit: 'Volver',
    };

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'list',
        message: 'Seleccione una opción',
        name: 'choice',
        choices: Object.values(choices),
      }
    ];

    // Realizar la modificación
    const action = async (answers: any) => {
      switch (answers.choice) {
        case choices.changeName:
          await this.promptNewNameFor(menuToEdit);
          break;
        case choices.addExistentPlates:
          await this.promptExistentPlatesFor(menuToEdit);
          break;
        case choices.addNewPlate:
          await this.promptNewPlateFor(menuToEdit);
          break;
        case choices.removePlates:
          await this.promptRemovePlatesFrom(menuToEdit);
      }
      this.stock.removeMenu(oldMenuName);
      this.stock.addMenu(menuToEdit);
    };

    await inquirer.prompt(prompt).then(action);
  }


  // Nameables
  /**
   * Permite al usuario introducir asignar un nuevo nombre a `nameable`
   * @param nameable Objeto que implementa la interfaz `Nameable`
   */
  async promptNewNameFor(nameable: Nameable) {
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'input',
      name: 'newName',
      message: `Nuevo nombre (${nameable.getName()}):`,
    };

    const action = (answers: any) => {
      nameable.setName(answers.newName);
    };

    await inquirer.prompt(prompt).then(action);
  }

  // IngredientsHolders
  /**
   * Permite al usuario introducir una serie de nuevos ingredientes (a partir de los alimentos presentes en el Stock) a `ingredientsReceiver`
   * @param ingredientsReceiver Objeto que implementa la interfaz `IngredientsHolder` 
   */
  async promptNewIngredientsFor(ingredientsReceiver: IngredientsHolder) {
    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'recursive',
        message: `Ingrese los ingredientes:`,
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
        ingredientsReceiver.addIngredient(new Ingredient(this.stock.searchFoodByname(ingredient.foodName), ingredient.ammount));
      });
    };

    await inquirer.prompt(prompt).then(action);
  }

  /**
   * Permite al usuario eliminar una serie de ingredientes de `ingredientsHolder`
   * @param ingredientsHolder Objeto que implementa la interfaz `IngredientesHolder`
   */
  async promptRemoveIngredientsFrom(ingredientsHolder: IngredientsHolder) {
    const ingredients = ingredientsHolder.getIngredients().map((ing) => ing.getFood().getName());

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'checkbox',
        name: 'ingredientNames',
        message: 'Elija los ingredientes a eliminar',
        choices: ingredients,
      }
    ];

    const action = (answers: any) => {
      console.log('Eliminando ingredientes...');
      if (answers['ingredientNames']) {
        answers['ingredientNames'].forEach((ingName: string) => ingredientsHolder.removeIngredient(ingName));
      }
    };

    await inquirer.prompt(prompt).then(action);
  }

  // PriceByKgHolders
  /**
   * Permite al usuario asignar un nuevo precio a `priceHolder`
   * @param priceHolder Objeto que implementa la interfaz `PriceByKgHolder`
   */
  async promptNewPriceByKgFor(priceHolder: PriceByKgHolder) {
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'input',
      name: 'newPricebykg',
      message: `Nuevo precio por Kg (${priceHolder.getPriceByKg()}):`,
    };

    const action = (answers: any) => {
      priceHolder.setPriceByKg(answers.newName);
    };

    await inquirer.prompt(prompt).then(action);
  }

  // CartasHolders
  /**
   * Permite al usuario añadir una nueva carta a `cartaReceiver`
   * @param cartaReceiver Objeto que implementa la interfaz `CartasHolder`
   */
  async promptNewCartaFor(cartaReceiver: CartasHolder) {
    
    const newCarta = new Carta('', [], []);
    
    // Define nombre de la carta
    await this.promptNewNameFor(newCarta);
    
    // Muestra opciones para la carta
    const choices = {
      addExistentMenus: 'Añadir menús existentes',
      addNewMenu: 'Añadir menú nuevo',
      addExistingPlates: 'Añadir platos existentes',
      addNewPlaes: 'Añadir nuevos platos',
    };

    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      name: 'choice',
      message: 'Seleccione una opción',
      choices: Object.values(choices),
    };

    const action = async (answers: any) => {
      switch (answers.choice) {
        case choices.addExistentMenus:
          await this.promptExistentMenusFor(newCarta);
          break;
        case choices.addNewMenu:
          await this.promptNewMenuFor(newCarta);
          break;
        case choices.addExistingPlates:
          await this.promptExistentPlatesFor(newCarta);
          break;
        case choices.addNewPlaes:
          await this.promptNewPlateFor(newCarta);
      }

      cartaReceiver.addCarta(newCarta);
    };

    await inquirer.prompt(prompt).then(action);

  }

  /**
   * Permite al usuario añadir una serie de cartas almacenadas en Stock a `cartasReceiver`
   * @param cartasReceiver Objeto que implementa la interfaz `CartasHolder`
   */
  async promptExistentCartaFor(cartasReceiver: CartasHolder) {
    const cartasNames = this.stock.getCartas().map((carta) => carta.getName());
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'checkbox',
      message: 'Seleccione las cartas a añadir',
      name: 'cartasNames',
      choices: cartasNames,
    };

    const action = (answers: any) => {
      answers.cartasNames.forEach((cartaName: string) => cartasReceiver.addCarta(this.stock.searchCartaByName(cartaName)));
    };

    await inquirer.prompt(prompt).then(action);
  }

  /**
   * Permite al usuario eliminar una serie de cartas almacenadas en `cartasHolder`
   * @param cartasHolder Objeto que implementa la interfaz `CartasHolder`
   */
  async promptRemoveCartasFrom(cartasHolder: CartasHolder) {
    const cartaNames = cartasHolder.getCartas().map((carta) => carta.getName());

    const prompt: inquirer.QuestionCollection<any> = {
      type: 'checkbox',
      name: 'cartaNames',
      message: 'Elija las cartas a eliminar',
      choices: cartaNames,
    };
    
    const action = (answers: any) => {
      answers.cartaNames.forEach((cartaName: string) => cartasHolder.removeCarta(cartaName));
    };

    await inquirer.prompt(prompt).then(action);
  }

  /**
   * Permite al usuario modificar una carta de `cartasHolder`
   * @param cartasHolder Objeto que implementa la interfaz `CartasHolder`
   */
  async promptModifyCartaFrom(cartasHolder: CartasHolder) {
    let cartaToEdit: Carta;
    let oldCartaName: string;
    
    // Elegir la carta a modificar
    await inquirer.prompt(
        {
          type: 'list',
          name: 'cartaName',
          choices: cartasHolder.getCartas().map((carta) => carta.getName()),
        }
    ).then((answers: any) => {
      cartaToEdit = clone(cartasHolder.searchCartaByName(answers.cartaName));
      oldCartaName = cartaToEdit.getName();
    });

    // Elegir el tipo de modificación
    const choices = {
      changeName: 'Cambiar nombre',
      
      addExistentPlates: 'Añadir platos existentes.',
      addNewPlate: 'Añadir nuevo plato.',
      removePlates: 'Quitar platos.',

      addExistingMenus: 'Añadir menús existentes',
      addNewMenu: 'Añadir nuevo menú',
      removeMenus: 'Quitar menús',

      quit: 'Volver',
    };

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'list',
        message: 'Seleccione una opción',
        name: 'choice',
        choices: Object.values(choices),
      }
    ];

    const action = async (answers: any) => {
      switch (answers.choice) {
        case choices.changeName:
          await this.promptNewNameFor(cartaToEdit);
          break;
        
        case choices.addExistentPlates:
          await this.promptExistentPlatesFor(cartaToEdit);
          break;
        case choices.addNewPlate:
          await this.promptNewPlateFor(cartaToEdit);
          break;
        case choices.removePlates:
          await this.promptRemovePlatesFrom(cartaToEdit);
          break;

        case choices.addExistingMenus:
          await this.promptExistentMenusFor(cartaToEdit);
          break;
        case choices.addNewMenu:
          await this.promptNewMenuFor(cartaToEdit);
          break;
        case choices.removeMenus:
          await this.promptRemoveMenusFrom(cartaToEdit);
          break;
      }
      this.stock.removeCarta(oldCartaName);
      this.stock.addCarta(cartaToEdit);
    };

    await inquirer.prompt(prompt).then(action);
  }
};

