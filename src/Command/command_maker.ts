import {Stock} from '../Stock/Stock';
import {Command} from '../Command/command';
import {CommandOrder} from '../Command/command_order';
import {BasicPlate} from '../Plate/index';
import {Menu} from '../Menu/index';
import * as inquirer from 'inquirer';
import 'colors';
import { PlatesHolder, CartasHolder } from '../Interfaces';
import { MenusHolder } from '../Interfaces';
import { Carta } from "../Carta/carta";

/**
 * Clase CommandMaker que gestiona la 
 * comanda del cliente
 */
export class CommandMaker {
  private command :Command = new Command([]);
  constructor(private stock :Stock) { }
  private carte :Carta;
  private carteSelected :boolean;
  
  /**
   * Inicia la comanda
   */
  async run() {
    await this.promptCarteMenu();
  }

  /**
   * Muestra la carta
   * @returns 
   */
  async promptCarteMenu() {
    console.clear();
    this.carteSelected = false;
    let quit = false;

    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      name: 'carte',
      message: 'Selecciona la Carta',
      choices: this.stock.getCartas().map((carta) => carta.getName()).concat([`Volver`])
    };

    const action = async (answers: any) => {
      switch (answers['carte']) {
        case `Volver`:
          quit = true;
          break;
        default:
          await this.promptShowCarte(answers[`carte`]);
          break;
      }
    };

    await inquirer.prompt(prompt).then(action);
    if (quit) return;
    if (this.carteSelected) {
      await this.promptMainMenu();
    } {
      await this.promptCarteMenu();
    }
  }

  /**
   * Muestra la informacion de la carta
   * @param {String} carteName 
   */
  async promptShowCarte(carteName :string) {
    const Carte = this.stock.searchCartaByName(carteName);
    console.log(`Nombre de la Carta: ${Carte.getName()}`);
    console.log('Menús: ');
    Carte.getMenus().forEach((Menu) => {
      console.log(`- ${Menu.getName()}`);
    });

    console.log("Platos del menú");
    Carte.getPlates().forEach((Plate) => {
      console.log(`- ${Plate.getName()}`);
    });

    const choices = {
      AddMenu: "Agregar Menú",
      Back: "Volver"
    };

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'list',
        name: 'choice',
        choices: Object.values(choices)
      }
    ];
    const action = async (answers: any) => {
      switch (answers['choice']) {
        case choices.AddMenu:
          this.carte = this.stock.searchCartaByName(carteName);
          this.carteSelected = true;
          break;
        case choices.Back:
          break;
      }
    };

    await inquirer.prompt(prompt).then(action);

  };

  /**
   * Muestra las opciones disponibles
   * @returns 
   */
  async promptMainMenu() {
    console.clear();
    const choices = {
      addPlates: "Añadir Platos".blue,
      deletePlates: "Eliminar Platos".blue,
      editPlates: "Editar Cantidad de plato".blue,
      addMenu: "Agregar Menú".red,
      showCommand: "Mostrar Comanda".yellow,
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
        // Command Options
        case choices.addPlates:
          await this.promptShowPlates(this.carte);
          break;
        case choices.showCommand:
          await this.showCommand();
          break;
        case choices.deletePlates:
          await this.promptdeletePlates();
          break;
        case choices.editPlates:
          await this.promptEditAmmountPlates();
          break;
        case choices.addMenu:
          await this.promptShowMenus(this.carte);
          break;
        case choices.quit:
          quit = true;
          break;
      }
    };

    await inquirer.prompt(prompt).then(action);

    if (quit) return;
    await this.promptMainMenu();

  }

  /**
   * Muestra los platos
   * @param {PlatesHolder} platesHolder 
   * @returns 
   */
  async promptShowPlates(platesHolder: PlatesHolder) {
    console.clear();
    let quit = false;
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      name: 'plate',
      message: 'Selecciona el plato',
      choices: platesHolder.getPlates().map((plate) => plate.getName()).concat(['Volver'])
    };

    const action = async (answers: any) => {
      switch (answers['plate']) {
        case 'Volver':
          quit = true;
          break;
      
        default:
          await this.promptAddPlate(answers['plate']);
          break;
      }
    };

    await inquirer.prompt(prompt).then(action);
    if (quit) return;
    await this.promptShowPlates(platesHolder);
  }

  /**
   * Muestra informacion del plato a añadir
   * @param {String} PlateName Nombre del plato
   */
  async promptAddPlate(PlateName :string) {
    const Plate :BasicPlate = this.stock.searchPlateByName(PlateName);
    
    console.log(`Nombre del plato: ${Plate.getName()}`);
    console.log(`Tipo de plato: ${Plate.getType()}`);
    console.log('Ingredientes: ');
    Plate.getIngredients().forEach((ingredient) => {
      console.log(`- ${ingredient.getFood().getName()}`);
    });

    console.log("Composición nutricional");
    const nutricionalcomposition = Plate.getNutritionalComposition();
    console.log(`- Lípidos: ${nutricionalcomposition.lipids.toFixed(2)}`);
    console.log(`- Carbohidratos: ${nutricionalcomposition.carbohydrates.toFixed(2)}`);
    console.log(`- Proteínas: ${nutricionalcomposition.proteins.toFixed(2)}`);

    console.log(`Precio del plato: `);
    console.log(`- ` + Plate.getPrice().toFixed(2) + '€');

    const choices = {
      AddPlate: "Agregar Plato",
      Back: "Volver"
    };

    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'list',
        name: 'choice',
        choices: Object.values(choices)
      }
    ];
    const action = async (answers: any) => {
      switch (answers['choice']) {
        case choices.AddPlate:
          const order = this.command.searchOrderByName(PlateName);
          if (order) {
            order.oneMoreQuantity();   
          } else {
            this.command.addOrder(new CommandOrder(Plate, 1));        
          }
          break;
        case choices.Back:
          break;
      }
    };

    await inquirer.prompt(prompt).then(action);

  };

  /**
   * Muestra la informacion de la comanda
   * @returns 
   */
  async showCommand() {
    const prompt: inquirer.QuestionCollection<any> = [
      {
        type: 'list',
        name: 'choice',
        choices: ['Volver']
      }
    ];

    console.log('Comanda:');
    const orders :CommandOrder[] = this.command.getOrders();
    orders.forEach((order) => {
      console.log(`- ${order.getOrder().getName()}\n    Cantidad:  ${order.getQuantity()}\n    Precio: ${order.getPrice().toFixed(2)} €`);
    });
    console.log(`----------------------------------------------`);
    console.log(`    Precio total de la comanda: ${this.command.getPrice().toFixed(2)} €`);
    const action = async (answers: any) => {

    };

    await inquirer.prompt(prompt).then(action);
    return;
  }

  /**
   * Elimina un plato de la comanda
   * @returns 
   */
  async promptdeletePlates() {
    console.clear();
    const orders :CommandOrder[] = this.command.getOrders();
    let quit = false;
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      name: 'plate',
      message: 'Selecciona el plato',
      choices: orders.map((plate) => plate.getOrder().getName()).concat(['Volver'])
    };

    const action = async (answers: any) => {
      switch (answers['plate']) {
        case 'Volver':
          quit = true;
          break;
      
        default:
          this.command.removePlate(answers[`plate`]);
          break;
      }
    };

    await inquirer.prompt(prompt).then(action);
    if (quit) return;
    await this.promptdeletePlates();
  }

  /**
   * Muestra los menus disponibles
   * @param {MenusHolder} menuHolder 
   * @returns 
   */
  async promptShowMenus(menuHolder: MenusHolder) {
    console.clear();
    let quit = false;
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      name: 'menu',
      message: 'Selecciona el menú',
      choices: menuHolder.getMenus().map((menu) => menu.getName()).concat(['Volver'])
    };

    const action = async (answers: any) => {
      switch (answers['menu']) {
        case 'Volver':
          quit = true;
          break;
      
        default:
          const platesofmenu = this.stock.searchMenuByName(answers['menu']);
          await this.promptShowMenu(platesofmenu);
          break;
      }
    };

    await inquirer.prompt(prompt).then(action);
    if (quit) return;
    await this.promptShowMenus(menuHolder);
  
  };

  /**
   * Muestra la informacion del menu seleccionado
   * @param {Menu} menu Menu seleccionado
   */
  async promptShowMenu(menu :Menu) {
    console.clear();

    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      name: 'choices',
      choices: [`Agregar Menú`, 'Volver']
    };

    console.log(`Nombre del menú: ${menu.getName()}`);
    console.log(`Platos del menú: `);
    menu.getPlates().forEach((plate) => console.log(`- ${plate.getName()}`));

    console.log("Composición nutricional");
    const nutricionalcomposition = menu.getNutritionalComposition();
    console.log(`- Lípidos: ${nutricionalcomposition.lipids.toFixed(2)}`);
    console.log(`- Carbohidratos: ${nutricionalcomposition.carbohydrates.toFixed(2)}`);
    console.log(`- Proteínas: ${nutricionalcomposition.proteins.toFixed(2)}`);

    console.log(`Precio del plato: `);
    console.log(`- ` + menu.getPrice().toFixed(2) + '€');
    const action = async (answers: any) => {
      switch (answers['menu']) {
        case 'Volver':
          break;
      
        default:
          menu.getPlates().forEach((plate) => {
            const order = this.command.searchOrderByName(plate.getName());
            if (order) {
              order.oneMoreQuantity();   
            } else {
              this.command.addOrder(new CommandOrder(plate, 1));        
            }
          });

          break;
      }
    };

    await inquirer.prompt(prompt).then(action);

  }

  /**
   * Muestra los platos de los que se puede 
   * editar la cantidad
   * @returns 
   */
  async promptEditAmmountPlates() {
    console.clear();
    let quit = false;
    const orders :CommandOrder[] = this.command.getOrders();
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      name: 'plate',
      message: 'Selecciona el plato',
      choices: orders.map((plate) => plate.getOrder().getName()).concat(['Volver'])
    };

    const action = async (answers: any) => {
      switch (answers['plate']) {
        case 'Volver':
          quit = true;
          break;
      
        default:
          await this.promptEditAmmountPlate(answers['plate']);
          break;
      }
    };

    await inquirer.prompt(prompt).then(action);
    if (quit) return;
    await this.promptEditAmmountPlates();
  }

  /**
   * Edita la cantidad de el plato seleccionado
   * @param {String} plateName Nombre del plato
   */
  async promptEditAmmountPlate(plateName :string) {
    const prompt :inquirer.QuestionCollection<any> = {
      type: 'input',
      name: 'ammount',
      message: 'Cantidad del plato: '
    };
    
    console.log(`Plato actual: ${plateName}`);

    const action = (answer :any) => {
      this.command.searchOrderByName(plateName)?.setQuantity(Number(answer['ammount']));
    };

    await inquirer.prompt(prompt).then(action);
  };

};

