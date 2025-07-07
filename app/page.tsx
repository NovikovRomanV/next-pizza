import {Container, Filters, Title, TopBar} from "@/components/shared";
import {ProductsGroupList} from "@/components/shared/products-group-list";


export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold"/>
            </Container>
            <TopBar/>
            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">

                    {/*фильтр*/}
                    <div className="w-[250px]">
                        <Filters/>
                    </div>

                    {/*список товаров*/}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList title='Пиццы' items={[
                                {
                                    id:0,
                                    name: "Пицца моцарелла",
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee7d612fc7b7fca5be822752bee1e5.avif',
                                    items: [{price: 550}],
                                },
                                {
                                    id:1,
                                    name: "Пицца моцарелла",
                                    price: 500,
                                    imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d612fc7b7fca5be822752bee1e5.avif",
                                    items: [{price: 550}],
                                },
                                {
                                    id:2,
                                    name: "Пицца моцарелла",
                                    price: 500,
                                    imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d612fc7b7fca5be822752bee1e5.avif",
                                    items: [{price: 550}],
                                },
                                {
                                    id:3,
                                    name: "Пицца моцарелла",
                                    price: 500,
                                    imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d612fc7b7fca5be822752bee1e5.avif",
                                    items: [{price: 550}],
                                },
                                {
                                    id:4,
                                    name: "Пицца моцарелла",
                                    price: 500,
                                    imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d612fc7b7fca5be822752bee1e5.avif",
                                    items: [{price: 550}],
                                }
                            ]} categoryId={1}/>
                            <ProductsGroupList title='Комбо' items={[
                                {
                                    id:0,
                                    name: "Пицца моцарелла",
                                    price: 500,
                                    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11ee7d612fc7b7fca5be822752bee1e5.avif',
                                    items: [{price: 550}],
                                },
                                {
                                    id:1,
                                    name: "Пицца моцарелла",
                                    price: 500,
                                    imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d612fc7b7fca5be822752bee1e5.avif",
                                    items: [{price: 550}],
                                },
                                {
                                    id:2,
                                    name: "Пицца моцарелла",
                                    price: 500,
                                    imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d612fc7b7fca5be822752bee1e5.avif",
                                    items: [{price: 550}],
                                },
                                {
                                    id:3,
                                    name: "Пицца моцарелла",
                                    price: 500,
                                    imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d612fc7b7fca5be822752bee1e5.avif",
                                    items: [{price: 550}],
                                },
                                {
                                    id:4,
                                    name: "Пицца моцарелла",
                                    price: 500,
                                    imageUrl: "https://media.dodostatic.net/image/r:233x233/11ee7d612fc7b7fca5be822752bee1e5.avif",
                                    items: [{price: 550}],
                                }
                            ]} categoryId={2}/>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
