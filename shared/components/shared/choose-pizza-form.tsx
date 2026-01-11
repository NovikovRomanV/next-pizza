"use client"

import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components/shared/title";
import {Button} from "../ui/button";
import {PizzaImage} from "@/shared/components/shared/pizza-image";
import {GroupVariants} from "@/shared/components/shared/group-variants";
import {PizzaSize, PizzaType, pizzaSizes, pizzaTypes, mapPizzaType} from "@/shared/constants/pizza";
import {useEffect, useState} from "react";
import {Ingredient, ProductItem} from "@prisma/client";
import {IngredientItem} from "./ingredient-item";
import useSet from "react-use/lib/useSet";


type Props = {
    imageUrl: string
    name: string
    className?: string
    ingredients: Ingredient[]
    items: ProductItem[]
    onClickAddCart?: VoidFunction
}

export const ChoosePizzaForm: React.FC<Props> = ({name, items, imageUrl, ingredients, onClickAddCart, className}) => {
    const [size, setSize] = useState<PizzaSize>(20)
    const [type, setType] = useState<PizzaType>(1)
    const [selectedIngredients, {toggle: addIngredient}] = useSet( new Set<number>([]))

    const textDetails = `${size} см, ${mapPizzaType[type]} пицца`

    const pizzaPrice = items.find((item)=> item.size === size && item.pizzaType === type)?.price ?? 0

    const ingredientPrice = ingredients
        .filter((ing) => selectedIngredients.has(ing.id))
        .reduce((ecc, ingredient) => ecc + ingredient.price, 0)

    const totalPrice = pizzaPrice + ingredientPrice

    const handlerClickAdd = () => {
        onClickAddCart?.()
    }

    const availablePizzas = items.filter((item) => item.pizzaType === type)
    const availablePizzaSize = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !availablePizzas.some((pizza) => Number(pizza.size) === Number(item.value))
    }))

    useEffect(()=>{
        const isAvailableSize = availablePizzaSize?.find(
            (item) => Number(item.value) === size && !item.disabled
        )
        const availableSize = availablePizzaSize?.find((item)=> !item.disabled)
        if(!isAvailableSize && availableSize){
            setSize(Number(availableSize.value) as PizzaSize)
        }
    }, [type])

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size}/>
            <div className='w-[490px] bg-[#f7f6f5] p-7'>
                <Title text={name} size='md' className="font-extrabold mb-1"/>

                <p className="text-gray-400">{textDetails}</p>


                <div className='flex flex-col gap-4 mt-5'>
                    <GroupVariants items={availablePizzaSize} value={String(size)}
                                   onClick={(value) => setSize(Number(value) as PizzaSize)}/>

                    <GroupVariants items={pizzaTypes} value={String(type)}
                                   onClick={(value) => setType(Number(value) as PizzaType)}/>
                </div>

                <div className='bg-gray-50 p-5 rounded-mb h-[420px] overflow-auto scrollbar mt-5'>
                    <div className='grid grid-cols-3 gap-3'>
                        {ingredients.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                imageUrl={ingredient.imageUrl}
                                price={ingredient.price}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button onClick={handlerClickAdd} className="h-[55px] pz-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice}
                </Button>
            </div>
        </div>

    )
}






