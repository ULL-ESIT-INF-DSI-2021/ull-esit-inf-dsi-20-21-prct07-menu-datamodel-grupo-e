import { FoodGroup, Macronutrients } from "../Food";
import { BasicPlate, StarterPlate } from "../Plate";
import { PlateType } from "../Plate/basic_plate";
import { Dessert } from "../Plate/dessert";
import { FirstPlate } from "../Plate/first_plate";
import { SecondPlate } from "../Plate/second_plate";

export class Menu {

  private plates: BasicPlate[];

  constructor(private name: string, ...plates_: BasicPlate[]) {
    if (!this.platesAreValid(plates_)) {
      throw new Error('Bad Menu configuration');
    }

    this.plates = plates_;
  }

  // Getters
  getNameOfMenu() {
    return this.name;
  }

  getPlates(): BasicPlate[] {
    // En orden de aparición
    return this.getStarterPlates().concat(this.getFirsPlates()).concat(this.getSecondPlates()).concat(this.getDesserts());
  }

  getStarterPlates(): StarterPlate[] {
    return this.plates.filter((plate) => plate instanceof StarterPlate);
  }

  getFirsPlates(): FirstPlate[] {
    return this.plates.filter((plate) => plate instanceof FirstPlate);
  }

  getSecondPlates(): SecondPlate[] {
    return this.plates.filter((plate) => plate instanceof SecondPlate);
  }

  getDesserts(): Dessert[] {
    return this.plates.filter((plate) => plate instanceof Dessert);
  }

  getPrice(): number {
    return this.getPlates().reduce((total, plate) => total + plate.getPrice(), 0);
  }

  getNutritionalComposition(): Macronutrients {
    const nutritionalComposition = new Macronutrients();
    const platesCompositions = this.getPlates().map((plate) => plate.getNutritionalComposition());

    nutritionalComposition.lipids = platesCompositions.reduce((lipids, composition) => lipids + composition.lipids, 0);
    nutritionalComposition.carbohydrates = platesCompositions.reduce((carbohydrates, composition) => carbohydrates + composition.carbohydrates, 0);
    nutritionalComposition.proteins = platesCompositions.reduce((proteins, composition) => proteins + composition.proteins, 0);
    
    return nutritionalComposition;
  }

  listFoodGroups(): FoodGroup[] {
    if (this.getPlates()) {
      return [...new Set<FoodGroup>(this.getPlates().map((plate) => plate.getPredominantFoodGroup()))];
    }
    return [];
  }
  
  platesAreValid(plates: BasicPlate[]): boolean {
    if (plates.length > 4 || plates.length < 3) return false;

    const uniqPlateTypes = [...new Set<PlateType>(plates.map((plate) => plate.getType()))];
    if (uniqPlateTypes.length < 3) return false;

    return true;
  }

  addPlate(newPlate: BasicPlate) {
    const setNameofPlates = new Set();
    this.plates.forEach((plate) => setNameofPlates.add(plate.getName()));
  
    if (!setNameofPlates.has(newPlate.getName())) {
      this.plates = this.plates.concat(newPlate);
      setNameofPlates.add(newPlate.getName());
    }
  }

  removePlate(plateName: string) {
    this.plates.forEach((plate, index) => plate.getName() === plateName ? this.removePlateByIndex(index) : true);
  }

  private removePlateByIndex(index: number) {
    this.plates.splice(index, 1);
  }

  
};
