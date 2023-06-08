export interface IContact {
    chatRoomId: string;
    firstName: string;
    imageURL: string;
    lastName: string;
    otherUserUniqueId: string;
    phoneNumber?: string;
    country?: string;
    countryCode?: string;
    info?: string
}

export interface IActionButton {
    title: string;
    icon: string;
}

export interface IStatusCard {
    info: string | undefined
}
export interface IContactActions {
    title: string | undefined;
    index: number
}
export interface IContactProfilePictureScreen {
    contactImageURL: string;
}