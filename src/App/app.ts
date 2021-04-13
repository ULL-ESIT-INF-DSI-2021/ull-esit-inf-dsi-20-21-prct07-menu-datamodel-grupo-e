import inquirer = require("inquirer");
import { Stock } from "../Stock";
import { StockEditor } from "../StockEditor";
import * as clone from 'clone';


export class App {
  
  private stockEditor: StockEditor;
  private stock: Stock;
  // private commandMaker: CommandMaker;

  constructor(databaseName: string) {
    this.stock = new Stock(databaseName);
    this.stockEditor = new StockEditor(this.stock);
  }

  run() {
    this.promptMainMenu();
  }

  async promptMainMenu() {
    const choices = {
      stockEditor: 'Editar inventario',
      commandMaker: 'Crear comanda',
    };

    const prompt = [
      {
        type: 'list',
        message: 'Elija una opción',
        name: 'choice',
        choices: Object.values(choices),
      }
    ];

    let outAnswers: any;
    const action = (answers: any) => {
      outAnswers = clone(answers);
    };
    
    await inquirer.prompt(prompt).then(action);
    
    
    switch (outAnswers['choice']) {
      case choices.stockEditor:
        this.stockEditor.run();
        break;
    }
  }
};

const app = new App('./src/App/database.json');
app.run();
