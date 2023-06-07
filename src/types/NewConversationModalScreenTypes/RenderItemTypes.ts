export interface RenderItemTypes {
    item: Item;
    index: number;
    didLetterChange?: boolean;
}

interface Item {
    uniqueId: string;
    firstName: string;
    lastName: string;
    imageURL: string;
    info: string
    chatRoomId: string;
}