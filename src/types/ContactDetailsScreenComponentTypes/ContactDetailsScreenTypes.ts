import { timestamp } from "../redux/sliceTypes";

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
    index?: number
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

export interface IHeaderLeftAccessory {
    contact: {
        chatRoomId: string;
        firstName: string;
        lastName: string;
        imageURL: string;
        otherUserUniqueId: string;
    }
}

export interface ISaveEditedContactButton {
    contactCanBeEdited: boolean;
    phoneNumber: string;
    country: string;
    countryCode: string;
    firstName: string;
    lastName: string
    contactUniqueId: string
}
