"use client"

import {FilterCheckbox, FilterCheckboxProps} from "@/components/shared/filter-checkbox";
import {Input} from "@/components/ui";
import {ChangeEvent, useState} from "react";

type Item = FilterCheckboxProps
type Props = {
    title: string
    items: Item[]
    defaultItems: Item[]
    limit?: number
    searchInputPlaceholder?: string
    className?: string
    onChange?: (values: string[]) => void
    defaultValue?: string[]

}

export const CheckboxFiltersGroup: React.FC<Props> = ({
                                                          title,
                                                          items,
                                                          defaultItems,
                                                          limit = 5,
                                                          searchInputPlaceholder = 'Поиск...',
                                                          className,
                                                          onChange,
                                                          defaultValue,
                                                      }) => {
    const [showAll, setShowAll] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const InputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const list = showAll ?
        items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : defaultItems?.slice(0, limit)

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
                        checked={false}
                        endAdornment={item.endAdornment}
                        onCheckedChange={() => onChange}
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