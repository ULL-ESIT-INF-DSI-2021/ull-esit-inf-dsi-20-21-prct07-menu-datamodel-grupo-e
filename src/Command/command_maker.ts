import {Stock} from '../Stock/Stock';
import {Command} from '../Command/command';
import {CommandOrder} from '../Command/command_order';
import {BasicPlate} from '../Plate/index';
import {Menu} from '../Menu/index';
import * as inquirer from 'inquirer';
import 'colors';
import { PlatesHolder } from '../Interfaces';
import { MenusHolder } from '../Interfaces';

export class CommandMaker {
  private command :Command = new Command([]);
  constructor(private stock :Stock) { }

  
  async run() {
    await this.promptMainMenu();
  }

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
          await this.promptShowPlates(this.stock);
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
          await this.promptShowMenus(this.stock);
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
      console.log(`- ${order.getOrder().getName()}\n    Cantidad:  ${order.getQuantity()}\n    Precio: ${(order.getPrice() * order.getQuantity()).toFixed(2)} €`);
    });
    console.log(`----------------------------------------------`);
    console.log(`    Precio total de la comanda: ${this.command.getPrice().toFixed(2)} €`);
    const action = async (answers: any) => {

    };

    await inquirer.prompt(prompt).then(action);
    return;
  }

  async promptdeletePlates() {
    console.clear();
    const orders :CommandOrder[] = this.command.getOrders();
    let quit = false;
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      name: 'plate',
      message: 'Selecciona el plato',
      choices: orders.map((plate) => plate.getPlate().getName()).concat(['Volver'])
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

  async promptEditAmmountPlates() {
    console.clear();
    let quit = false;
    const orders :CommandOrder[] = this.command.getOrders();
    const prompt: inquirer.QuestionCollection<any> = {
      type: 'list',
      name: 'plate',
      message: 'Selecciona el plato',
      choices: orders.map((plate) => plate.getPlate().getName()).concat(['Volver'])
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

