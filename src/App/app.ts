import inquirer = require("inquirer");
import { Stock } from "../Stock";
import { StockEditor } from "../StockEditor";
import { CommandMaker } from "../Command/command_maker";


/**
 * Clase App, que representa al programa principal, y el que 
 * se ejecuta en relación al usuario
 */
export class App {

  private stockEditor: StockEditor;
  private stock: Stock;
  private commandmaker :CommandMaker;
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
    this.commandmaker = new CommandMaker(this.stock);
  }

  /**
   * Método que se usa de intermediario con
   * otro método
   */
  async run() {
    await this.promptMainMenu();
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

