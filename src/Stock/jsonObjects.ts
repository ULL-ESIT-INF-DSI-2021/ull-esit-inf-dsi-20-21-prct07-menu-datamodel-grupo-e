
import { Macronutrients } from "../Food/macronutrients";
import { FoodGroup } from "../Food/basic_food";
import { BasicPlate } from "../Plate/basic_plate";

export type jsonFood = {
  name: string,
  origin: string,
  price :number,
  macronutrients :Macronutrients,
  type :FoodGroup
};

export type jsonIngredient = {
  jsonFood :jsonFood,
  ammount :number,
};


export type jsonPlate = {
  name :string,
  price: number,
  ingredients: jsonIngredient[],
  nutritionalC :Macronutrients,
  type: string,
};


export type jsonMenu = {
  name :string,
  price :number,
  jsonPlates :jsonPlate[],
};

export type jsonCarta = {
  name: string, 
  menus: jsonMenu[],
  singlePlates: jsonPlate[],
}

