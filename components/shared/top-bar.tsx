import {Categories} from "@/components/shared/categories";
import {SortPopup} from "@/components/shared/sort-popup";
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/container";

type Props = {
    className?: string;
}

export const TopBar: React.FC<Props> = ({className}) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
            <Container className="flex items-center justify-between">
                <Categories/>
                <SortPopup/>
            </Container>
        </div>
    )
}