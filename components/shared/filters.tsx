'use client'

import React, {useEffect, useState} from "react";
import {Title} from "@/components/shared/title";
import {FilterCheckbox} from "./filter-checkbox";
import {Input} from "@/components/ui";
import {RangeSlider} from "@/components/shared/range-slider";
import {CheckboxFiltersGroup} from "@/components/shared/checkbox-filters-group";
import {useFilterIngredients} from "@/hooks/useFilterIngredients";
import {useSet} from "react-use";
import qs from "qs";
import {useRouter, useSearchParams} from "next/navigation";

type Props = {
    className?: string;
}

type PriceProps = {
    priceFrom?: number;
    priceTo?: number
}

type QueryFilters = {
    pizzaTypes: string
    sizes: string
    ingredients: string
} & PriceProps

export const Filters: React.FC<Props> = ({className}) => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    const router = useRouter();
    const {ingredients, loading, onAddId, selectedIngredients} = useFilterIngredients()

    const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []))
    const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []))

    const [prices, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom") || undefined),
        priceTo: Number(searchParams.get("priceTo") || undefined),
    })
    const items = ingredients.map((item) => ({text: item.name, value: String(item.id)}))

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value,
        })
    }


    useEffect(() => {
        const filters = {
            ...prices,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIngredients),
        }

        const query = qs.stringify(filters, {arrayFormat: "comma"})

        router.push(`?${query}`, {scroll: false})
    }, [sizes, pizzaTypes, prices, selectedIngredients]);

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={togglePizzaTypes}
                selected={pizzaTypes}
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Традиционное', value: '2' },
                ]}
            />

            <CheckboxFiltersGroup
                title="Размеры"
                name="sizes"
                className="mb-5"
                onClickCheckbox={toggleSizes}
                selected={sizes}
                items={[
                    {text: '20 см', value: '20'},
                    {text: '30 см', value: '30'},
                    {text: '40 см', value: '40'},
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p>Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} value={prices.priceFrom}
                           onChange={(e) => updatePrice("priceFrom", Number(e.currentTarget.value))}/>
                    <Input type="number" min={100} max={1000} placeholder="1000" value={prices.priceTo}
                           onChange={(e) => updatePrice("priceTo", Number(e.currentTarget.value))}/>
                </div>
                <RangeSlider min={0} max={1000} step={10} value={[prices.priceFrom || 0, prices.priceTo || 1000]}
                             onValueChange={([priceFrom, priceTo]) => setPrice({priceFrom, priceTo})}/>
            </div>

            <CheckboxFiltersGroup title="Ингредиенты"
                                  className='mt-5'
                                  limit={6}
                                  defaultItems={items.slice(0, 6)}
                                  items={items}
                                  loading={loading}
                                  onClickCheckbox={onAddId}
                                  selected={selectedIngredients}
                                  name={"ingredients"}
            />
        </div>
    )
}