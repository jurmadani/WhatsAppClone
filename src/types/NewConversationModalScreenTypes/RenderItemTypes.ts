export interface RenderItemTypes {
    item: Item;
    index: number;
}

interface Item {
    uniqueId: string;
    firstName: string;
    lastName: string;
    imageURL: string;
    info: string
}