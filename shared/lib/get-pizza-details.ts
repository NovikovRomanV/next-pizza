import {calcTotalPizzaPrice} from "@/shared/lib/calc-total-pizza-price";
import {Ingredient, ProductItem} from "@prisma/client";
import {mapPizzaType, PizzaSize, PizzaType} from "@/shared/constants/pizza";

export const getPizzaPrice = (type: PizzaType,
                              size: PizzaSize,
                              items: ProductItem[],
                              ingredients: Ingredient[],
                              selectedIngredients: Set<number>) => {
    const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients)
    const textDetails = `${size} см, ${mapPizzaType[type]} пицца`

    return {totalPrice, textDetails}
}