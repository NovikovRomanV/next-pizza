import {Ingredient, ProductItem} from "@prisma/client";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";


/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns number общую стоимость
 * */

export const calcTotalPizzaPrice = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const pizzaPrice = items.find((item)=> item.size === size && item.pizzaType === type)?.price ?? 0
    const ingredientPrice = ingredients
        .filter((ing) => selectedIngredients.has(ing.id))
        .reduce((ecc, ingredient) => ecc + ingredient.price, 0)

    return pizzaPrice + ingredientPrice
}