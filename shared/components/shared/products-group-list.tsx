"use client"

import React, {useEffect} from "react";
import {Title} from "@/shared/components/shared/title";
import {ProductCard} from "@/shared/components/shared/product-card";
import { useIntersection } from 'react-use';
import { cn } from "@/shared/lib/utils";
import {useCategoryStore} from "@/shared/store/category";

type Props = {
    title: string;
    items: any[]
    className?: string;
    listClassName?: string;
    categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({title, items, className, listClassName, categoryId}) => {

    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    useEffect(() => {
        if(intersection?.isIntersecting){
           setActiveCategoryId(categoryId)
        }
    }, [categoryId, intersection?.isIntersecting]);


    return (
        <div className={className} ref={intersectionRef} id={title}>
            <Title text={title} size="lg" className="font-extrabold mb-5"/>

            <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
                {items.map((item: any) => {
                    return (
                        <ProductCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            imageUrl={item.imageUrl}
                        />
                    )
                })}
            </div>
        </div>
    )
}