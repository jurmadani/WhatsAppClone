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
    chatRooms: IChatRooms[],
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

type IMessage = {
    messageId: string;
    text: string;
    createdAt: Date;
    chatRoomId: string;
    senderUniqueId: string;
}

