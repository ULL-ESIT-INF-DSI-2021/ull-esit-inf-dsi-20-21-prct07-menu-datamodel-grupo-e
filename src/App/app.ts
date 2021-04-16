import inquirer = require("inquirer");
import { Stock } from "../Stock";
import { StockEditor } from "../StockEditor";
import * as clone from 'clone';


/**
 * Clase App, que representa al programa principal, y el que 
 * se ejecuta en relación al usuario
 */
export class App {
  
  private stockEditor: StockEditor;
  private stock: Stock;
  // private commandMaker: CommandMaker;

  /**
   * El constructor emplea un nombre para la base de datos
   * e inicializa stockEditor, para que interactue con el usuario,
   * crea una base de datos en Stock, con el nombre especificado
   * @param databaseName Nombre de la base de datos
   */
  constructor(databaseName: string) {
    this.stock = new Stock(databaseName);
    this.stockEditor = new StockEditor(this.stock);
  }

  /**
   * Método que se usa de intermediario con
   * otro método
   */
  run() {
    this.promptMainMenu();
  }

  /**
   * Método que sirve para el promt del usuario
   * se basa en una serie de opciones, y al final
   * hace uso de StockEditor
   */
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
