import {Container} from "@/components/shared/container";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
}

export default function Header({className}: Props) {
    return (
        <header className={cn('border border-b', className)}>
            <Container className={cn('flex items-center justify-between')}>

            </Container>
        </header>
    )
}