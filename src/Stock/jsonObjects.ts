import { Macronutrients } from "../Food/macronutrients";
import { FoodGroup } from "../Food/basic_food";
import { BasicPlate } from "../Plate/basic_plate";

/**
 * Objeto de tipo Food en formato JSON
 */
export type JsonFood = {
  name: string,
  origin: string,
  price :number,
  macronutrients :Macronutrients,
  type :FoodGroup
};

/**
 * Objeto de ripo Ingredient en formato JSON
 */
export type JsonIngredient = {
  jsonFood :JsonFood,
  ammount :number,
};

/**
 * Objeto de tipo Plate en formato JSON
 */
export type JsonPlate = {
  name :string,
  ingredients: JsonIngredient[],
  type: string,
};

/**
 * Objeto de tipo Menu en formato JSON
 */
export type JsonMenu = {
  name :string,
  price :number,
  jsonPlates :JsonPlate[],
};

/**
 * Objeto de tipo Carta en formato JSON
 */
export type JsonCarta = {
  name: string, 
  menus: JsonMenu[],
  singlePlates: JsonPlate[],
}

