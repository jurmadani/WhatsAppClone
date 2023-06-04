export interface initialStateUserSlice {
    user: userSliceType | null;
}

export type userSliceType = {
    uniqueId: string,
    phoneNumber: string,
    countryCode: string,
    country: string,
    status: string,
    imageURL: string
    contacts: IContacts[],
    chatRooms: string[],
    fullName: string;
    info: string

}

type IContacts = {
    firstName: string;
    lastName: string;
    uniqueId: string;
}

export type IChatRooms = {
    chatRoomId: string;
    messages: IMessage[];
    users: string[];
    lastMessage: IMessage;
}

export type IMessage = {
    text: string;
    createdAt: Date;
    chatRoomId: string;
    senderUniqueId: string;
}

