
type PriceProps = {
    priceFrom?: number;
    priceTo?: number
}

type QueryFilters = {
    pizzaTypes: string
    sizes: string
    ingredients: string
} & PriceProps

export type Filters = {
    sizes: Set<string>
    pizzaTypes: Set<string>
    selectedIngredients: Set<string>
    prices: PriceProps
}

type ReturnProps = {
    setPrices: (name: keyof PriceProps, value: number) => void
    setPizzaType:  (value: string) => void
    setSizes: (value: string) => void
    setSelectedIngredients: (value: string) => void
} & Filters

import {useSearchParams} from "next/navigation";
import {useSet} from "react-use";
import {useState} from "react";

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    // Фильтр ингредиентов
    const [selectedIngredients, {toggle: toggleIngredients}] = useSet(
        new Set<string>(searchParams.get("ingredients")?.split(',')));

    // Фильтр размеров
    const [sizes, {toggle: toggleSizes}] = useSet(
        new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []))

    // Фильтр тип пиццы
    const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(
        new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []))

    // Фильтр стоимости
    const [prices, setPrices] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    return {
        sizes,
        pizzaTypes,
        prices,
        selectedIngredients,
        setPrices: updatePrice,
        setPizzaType: togglePizzaTypes,
        setSizes: toggleSizes,
        setSelectedIngredients: toggleIngredients,
    }
}