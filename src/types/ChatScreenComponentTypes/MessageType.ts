export interface MessageType {
    item: {
        chatRoomId: string;
        createdAt: {
            nanoseconds: number;
            seconds: number;
        };
        senderUniqueId: string;
        text: string;
        image?: string;
        read:boolean
    };
    index: number;
}