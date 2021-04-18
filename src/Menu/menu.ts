import { FoodGroup, Macronutrients } from "../Food";
import { Nameable, PlatesHolder } from "../Interfaces";
import { BasicPlate, StarterPlate } from "../Plate";
import { PlateType } from "../Plate/basic_plate";
import { Dessert } from "../Plate/dessert";
import { FirstPlate } from "../Plate/first_plate";
import { SecondPlate } from "../Plate/second_plate";

/**
 * Clase menú, representa a un conjunto de
 * platos variable,tiene un atributo que es
 * un vector de BasicPlate[]
 */
export class Menu implements PlatesHolder, Nameable {

  private plates: BasicPlate[];

  /**
   * El constructor inicializa el vector
   * interno de platos
   * @param name nombre
   * @param plates_ un conjunto de platos
   */
  constructor(private name: string, plates_: BasicPlate[], validatePlates = true) {
    if (validatePlates && !this.platesAreValid(plates_)) {
      throw new Error('Bad Menu configuration');
    }

    this.plates = plates_;
  }


  // Setters
  setName(newName: string) {
    this.name = newName;
  }

  // Getters
  /**
   * Método que obtiene el nombre del menú
   * @returns Una cadena de caracteres
   */
  getName() {
    return this.name;
  }

  /**
   * Método que lista los grupos de alimentos por
   * orden de aparición
   * @returns Un vector de platos
   */
  getPlates(): BasicPlate[] {
    return this.getStarterPlates().concat(this.getFirsPlates()).concat(this.getSecondPlates()).concat(this.getDesserts());
  }

  /**
   * Método que lista los posibles
   * entrantes del menú
   * @returns Un vector de StarterPlate
   */
  getStarterPlates(): StarterPlate[] {
    return this.plates.filter((plate) => plate instanceof StarterPlate);
  }

  /**
   * Método que lista los posibles
   * primeros platos del menú
   * @returns Un vector de FirstPlate
   */
  getFirsPlates(): FirstPlate[] {
    return this.plates.filter((plate) => plate instanceof FirstPlate);
  }

  /**
   * Método que lista los posibles 
   * segundos platos del menú
   * @returns Un vector de SecondPlate
   */
  getSecondPlates(): SecondPlate[] {
    return this.plates.filter((plate) => plate instanceof SecondPlate);
  }

  /**
   * Método que lista los posibles 
   * postres del menú
   * @returns Un vector de Dessert
   */
  getDesserts(): Dessert[] {
    return this.plates.filter((plate) => plate instanceof Dessert);
  }

  /**
   * Método que calcula el precio total del menú en euros
   * @returns Un valor numérico
   */
  getPrice(): number {
    return this.getPlates().reduce((total, plate) => total + plate.getPrice(), 0);
  }

  /**
   * Método que calcula la composición nutricional del menú
   * basándose en los platos que lo componen
   * @returns Un objeto Macronutrients
   */
  getNutritionalComposition(): Macronutrients {
    const nutritionalComposition = new Macronutrients();
    const platesCompositions = this.getPlates().map((plate) => plate.getNutritionalComposition());

    nutritionalComposition.lipids = platesCompositions.reduce((lipids, composition) => lipids + composition.lipids, 0);
    nutritionalComposition.carbohydrates = platesCompositions.reduce((carbohydrates, composition) => carbohydrates + composition.carbohydrates, 0);
    nutritionalComposition.proteins = platesCompositions.reduce((proteins, composition) => proteins + composition.proteins, 0);

    return nutritionalComposition;
  }

  /**
   * Método que calcula el listado de grupo de alimentos
   * @returns Un vector de grupo de alimentos
   */
  listFoodGroups(): FoodGroup[] {
    if (this.getPlates()) {
      return [...new Set<FoodGroup>(this.getPlates().map((plate) => plate.getPredominantFoodGroup()))];
    }
    return [];
  }

  /**
   * Un menú debe estar compuesto por un plato de cada
   * categoría o de al menos, tres de ellas
   * @param plates Un vector de platos
   * @returns Un valor verdadero o falso
   */
  platesAreValid(plates: BasicPlate[]): boolean {
    if (plates.length > 4 || plates.length < 3) return false;

    const uniqPlateTypes = [...new Set<PlateType>(plates.map((plate) => plate.getType()))];
    if (uniqPlateTypes.length < 3) return false;

    return true;
  }

  /**
   * Método que sirve para añadir un plato
   * @param newPlate El plato añadido
   * Posible nuevo comportamiento: si ya existe uno con el mismo nombre es sustituido.
   */
  addPlate(newPlate: BasicPlate) {
    const setNameofPlates = new Set();
    this.plates.forEach((plate) => setNameofPlates.add(plate.getName()));

    if (!setNameofPlates.has(newPlate.getName())) {
      this.plates = this.plates.concat(newPlate);
      setNameofPlates.add(newPlate.getName());
    }
  }

  /**
   * Método que elimina un plato por su nombre
   * @param plateName El nombre del plato
   */
  removePlate(plateName: string) {
    this.plates.forEach((plate, index) => plate.getName() === plateName ? this.removePlateByIndex(index) : true);
  }

  /**
   * Método que elimina un plato de acuerdo a su orden
   * @param index Un valor numérico (índice)
   */
  private removePlateByIndex(index: number) {
    this.plates.splice(index, 1);
  }

  searchPlateByName(plateName: string) {
    const result = this.getPlates().find((plate) => plate.getName() === plateName);
    if (result) return result;

    throw new Error(`No se ha podido encontrar un plato llamado ${plateName}`);
  }
};
