
import { Macronutrients } from "../Food/macronutrients";
import { FoodGroup } from "../Food/basic_food";
import { BasicPlate } from "../Plate/basic_plate";

export type JsonFood = {
  name: string,
  origin: string,
  price :number,
  macronutrients :Macronutrients,
  type :FoodGroup
};

export type JsonIngredient = {
  jsonFood :JsonFood,
  ammount :number,
};


export type JsonPlate = {
  name :string,
  ingredients: JsonIngredient[],
  type: string,
};


export type JsonMenu = {
  name :string,
  price :number,
  jsonPlates :JsonPlate[],
};

export type JsonCarta = {
  name: string, 
  menus: JsonMenu[],
  singlePlates: JsonPlate[],
}

