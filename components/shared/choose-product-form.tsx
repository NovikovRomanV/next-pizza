import {ProductImage} from "@/components/shared/product-image";
import {cn} from "@/lib/utils";
import {Title} from "@/components/shared/title";
import { Button } from "../ui/button";

type Props = {
    imageUrl: string
    name: string
    className?: string
    ingredients: any[]
    items?: any[]
    onClickAdd?: VoidFunction
}

export const ChooseProductForm: React.FC<Props> = ({name, items, imageUrl, ingredients, onClickAdd, className}) => {
    const textDetaills = '30 см, традиционное тесто 30'
const totalPrice = 350
    return (
        <div className={cn(className, 'flex flex-1')}>
            <ProductImage imageUrl={imageUrl} size={30}/>

            <div className='w-[490px] bg-[#f7f6f5] p-7'>
                <Title text={name} size='md' className="font-extrabold mb-1"/>

                <p className="text-gray-400">{textDetaills}</p>

                <Button className="h-[55px] pz-10 text-base rounded-[18px] w-full">Добавить в корзину за {totalPrice}</Button>
            </div>
        </div>

    )
}






