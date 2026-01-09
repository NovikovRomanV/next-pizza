'use client'

import React from "react";
import {Title} from "@/shared/components/shared/title";
import {Input} from "@/shared/components/ui";
import {RangeSlider} from "@/shared/components/shared/range-slider";
import {CheckboxFiltersGroup} from "@/shared/components/shared/checkbox-filters-group";
import { useIngredients, useFilters, useQueryFilters } from "../../hooks";

type Props = {
    className?: string;
}


export const Filters: React.FC<Props> = ({className}) => {
    const {ingredients, loading} = useIngredients()
    const filters = useFilters()

    useQueryFilters(filters)

    const updatePrices = (prices: number[]) => {
        filters.setPrices('priceFrom', prices[0])
        filters.setPrices('priceTo', prices[1])
    }
    const items = ingredients.map((item) => ({text: item.name, value: String(item.id)}))

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={filters.setPizzaType}
                selected={filters.pizzaTypes}
                items={[
                    {text: 'Тонкое', value: '1'},
                    {text: 'Традиционное', value: '2'},
                ]}
            />

            <CheckboxFiltersGroup
                title="Размеры"
                name="sizes"
                className="mb-5"
                onClickCheckbox={filters.setSizes}
                selected={filters.sizes}
                items={[
                    {text: '20 см', value: '20'},
                    {text: '30 см', value: '30'},
                    {text: '40 см', value: '40'},
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p>Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} value={filters.prices.priceFrom}
                           onChange={(e) => filters.setPrices("priceFrom", Number(e.currentTarget.value))}/>
                    <Input type="number" min={100} max={1000} placeholder="1000" value={filters.prices.priceTo}
                           onChange={(e) => filters.setPrices("priceTo", Number(e.currentTarget.value))}/>
                </div>
                <RangeSlider min={0} max={1000} step={10} value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
                             onValueChange={updatePrices}/>
            </div>

            <CheckboxFiltersGroup title="Ингредиенты"
                                  className='mt-5'
                                  limit={6}
                                  defaultItems={items.slice(0, 6)}
                                  items={items}
                                  loading={loading}
                                  onClickCheckbox={filters.setSelectedIngredients}
                                  selected={filters.selectedIngredients}
                                  name={"ingredients"}
            />
        </div>
    )
}