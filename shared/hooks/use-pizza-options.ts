import {useEffect, useState} from "react";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {Variant} from "@/shared/components/shared/group-variants";
import useSet from "react-use/lib/useSet";
import {ProductItem} from "@prisma/client";
import {getAvailablePizzaSizes} from "@/shared/lib";

type ReturnProps = {
    size: PizzaSize
    type: PizzaType
    setSize: (size: PizzaSize) => void
    setType: (type: PizzaType) => void
    selectedIngredients: Set<number>
    addIngredient: (id: number) => void
    availableSizes: Variant[]
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20)
    const [type, setType] = useState<PizzaType>(1)
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]))
    const availableSizes = getAvailablePizzaSizes(items, type)

    useEffect(() => {
        const isAvailableSize = availableSizes?.find(
            (item) => Number(item.value) === size && !item.disabled
        )
        const availableSize = availableSizes?.find((item) => !item.disabled)
        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize)
        }
    }, [type])

    return {
        size,
        type,
        setSize,
        setType,
        selectedIngredients,
        addIngredient,
        availableSizes,
    }
}