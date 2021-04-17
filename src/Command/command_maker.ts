import {Stock} from '../Stock/Stock';
import {Command} from '../Command/command';
import {CommandOrder} from '../Command/command_order';
import {BasicPlate} from '../Plate/index';
import * as inquirer from 'inquirer';
import 'colors';
import { PlatesHolder } from '../Interfaces';

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
      showCommand: "Mostrar Comanda",
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
    
    console.log(Plate.getName());
    console.log(Plate.getPrice().toFixed(2) + '€');

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
    console.log(`    Precio total de la comanda: ${this.command.getPrice()}`);
    const action = async (answers: any) => {

    };

    await inquirer.prompt(prompt).then(action);
    return;
  }


};

