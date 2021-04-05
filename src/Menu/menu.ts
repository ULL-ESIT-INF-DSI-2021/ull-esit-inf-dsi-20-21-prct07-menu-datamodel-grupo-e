import { FoodGroup, Macronutrients } from "../Food";
import { BasicPlate, StarterPlate } from "../Plate";
import { PlateType } from "../Plate/basic_plate";
import { Dessert } from "../Plate/dessert";
import { FirstPlate } from "../Plate/first_plate";
import { SecondPlate } from "../Plate/second_plate";


export class Menu {

  private starterPlates: StarterPlate[] = [];
  private firstPlates: FirstPlate[] = [];
  private secondPlates: SecondPlate[] = [];
  private desserts: Dessert[] = [];

  constructor(...plates: BasicPlate[]) {
    if (!this.platesAreValid(plates)) {
      throw new Error('Bad Menu configuration');
    }

    plates.forEach((plate) => {
      if (plate instanceof StarterPlate) this.starterPlates.push(plate);
      if (plate instanceof FirstPlate) this.firstPlates.push(plate);
      if (plate instanceof SecondPlate) this.secondPlates.push(plate);
      if (plate instanceof Dessert) this.desserts.push(plate);
    });
  }

  // Getters
  getPlates(): BasicPlate[] {
    return this.starterPlates.concat(this.firstPlates).concat(this.secondPlates).concat(this.desserts);
  }

  getStarterPlates(): StarterPlate[] {
    return this.starterPlates;
  }

  getFirsPlates(): FirstPlate[] {
    return this.firstPlates;
  }

  getSecondPlates(): SecondPlate[] {
    return this.secondPlates;
  }

  getDesserts(): Dessert[] {
    return this.desserts;
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
    if (newPlate instanceof StarterPlate) this.starterPlates = this.starterPlates.concat(newPlate);
    if (newPlate instanceof FirstPlate) this.firstPlates = this.firstPlates.concat(newPlate);
    if (newPlate instanceof SecondPlate) this.secondPlates = this.secondPlates.concat(newPlate);
    if (newPlate instanceof Dessert) this.desserts = this.desserts.concat(newPlate);
  }
};
