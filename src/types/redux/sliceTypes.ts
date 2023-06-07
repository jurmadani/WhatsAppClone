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

export type IContacts = {
    firstName: string;
    lastName: string;
    uniqueId: string;
}

export type IChatRooms = {
    chatRoomId: string;
    messages: IMessage[];
    users: string[];
    lastMessage: string;
}

export type timestamp = {
    seconds: number;
    nanoseconds: number
}

export type IMessage = {
    text: string;
    createdAt: timestamp;
    chatRoomId: string;
    senderUniqueId: string;
}

