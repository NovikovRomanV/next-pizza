"use client"

import {FilterCheckbox, FilterCheckboxProps} from "@/components/shared/filter-checkbox";
import {Input, Skeleton} from "@/components/ui";
import {ChangeEvent, useState} from "react";

type Item = FilterCheckboxProps
type Props = {
    title: string
    items: Item[]
    defaultItems?: Item[]
    limit?: number
    loading?: boolean
    searchInputPlaceholder?: string
    className?: string
    onClickCheckbox?: (id: string) => void
    defaultValue?: string[]
    selected: Set<string>
    name?: string

}

export const CheckboxFiltersGroup: React.FC<Props> = ({
                                                          title,
                                                          items,
                                                          defaultItems,
                                                          limit = 5,
                                                          searchInputPlaceholder = 'Поиск...',
                                                          className,
                                                          onClickCheckbox,
                                                          loading,
                                                          selected,
                                                          name,
                                                          defaultValue,
                                                      }) => {
    const [showAll, setShowAll] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const InputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const list = showAll ?
        items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : (defaultItems || items).slice(0, limit)

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold md-3">{title}</p>
                {Array(limit).fill(0).map((_, index) => (
                    <Skeleton key={index} className="h-6 mb-4 rounded-[8px]"/>
                ))}
                <Skeleton className="w-28 h-6 mb-4 rounded-[8px]"/>
            </div>
        )

    }


    return (
        <div className={className}>
            <p className="font-bold md-3">{title}</p>

            {showAll && <div className="mb-5">
                <Input onChange={InputChange} placeholder={searchInputPlaceholder} className="bg-gray-50 border-none"/>
            </div>}


            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        checked={selected.has(item.value)}
                        endAdornment={item.endAdornment}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        name={name}
                    />

                ))}
            </div>

            {items.length > limit && (
                <div>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}

        </div>
    )
}