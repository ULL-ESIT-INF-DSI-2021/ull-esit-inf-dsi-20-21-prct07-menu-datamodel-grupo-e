import inquirer = require("inquirer");
import { Stock } from "../Stock";
import { StockEditor } from "../StockEditor";
import { CommandMaker } from "../Command/command_maker";


export class App {

  private stockEditor: StockEditor;
  private stock: Stock;
  private commandmaker :CommandMaker;
  // private commandMaker: CommandMaker;

  constructor(databaseName: string) {
    this.stock = new Stock(databaseName);
    this.stockEditor = new StockEditor(this.stock);
    this.commandmaker = new CommandMaker(this.stock);
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
      // ------------------------------
      console.clear();
      // ------------------------------
      switch (answers['choice']) {
        case choices.stockEditor:
          await this.stockEditor.run();
          break;
        case choices.commandMaker:
          await this.commandmaker.run();
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

// const app = new App('./src/App/database.json');
const app = new App('./Databases/stock_database.json');
app.run();
