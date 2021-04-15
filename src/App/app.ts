import inquirer = require("inquirer");
import { Stock } from "../Stock";
import { StockEditor } from "../StockEditor";


export class App {

  private stockEditor: StockEditor;
  private stock: Stock;
  // private commandMaker: CommandMaker;

  constructor(databaseName: string) {
    this.stock = new Stock(databaseName);
    this.stockEditor = new StockEditor(this.stock);
  }

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {
    const choices = {
      stockEditor: 'Editar inventario',
      commandMaker: 'Crear comanda',
      exit: 'Salir',
    };

    const prompt = [
      {
        type: 'list',
        message: 'Elija una opción',
        name: 'choice',
        choices: Object.values(choices),
      }
    ];

    let quit = false;
    const action = async (answers: any) => {
      switch (answers['choice']) {
        case choices.stockEditor:
          await this.stockEditor.run();
          break;
        case choices.commandMaker:
          console.log('CommandMaker');
          break;
        case choices.exit:
          quit = true;
      }
    };

    await inquirer.prompt(prompt).then(action);
    if (quit) return;
    await this.promptMainMenu();
  }

};

const app = new App('./src/App/database.json');
app.run();
