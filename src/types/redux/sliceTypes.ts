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

export interface initialStateToastNotificationSlice {
    message: string;
    contactFirstName: string;
    contactLastName: string;
    contactImageURL: string;
    type: string;
    placement: "top" | "bottom" | "center",
    duration: number;
    displayNotification: boolean;
    contactUniqueId: string;
    chatRoomId: string;
}

export interface ICustomToastNotification {
    toast: {
        id?: string;

        icon?: JSX.Element;

        type?: "normal" | "success" | "danger" | "warning" | string;

        duration?: number;

        placement?: "top" | "bottom" | "center";

        animationDuration?: number;

        animationType?: "slide-in" | "zoom-in";

        successIcon?: JSX.Element;

        dangerIcon?: JSX.Element;

        warningIcon?: JSX.Element;

        successColor?: string;

        dangerColor?: string;

        warningColor?: string;

        normalColor?: string;

        onPress?(id: string): void;

        onClose?(): void;

        data?: any;
        swipeEnabled?: boolean;
        onDestroy(): void;
        message: string | JSX.Element;
        open: boolean;
        onHide(): void;
    }
}

