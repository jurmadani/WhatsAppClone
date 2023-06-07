export interface MessageType {
    item: {
        chatRoomId: string;
        createdAt: {
            nanoseconds: number;
            seconds: number;
        };
        senderUniqueId: string;
        text: string;
    };
    index: number;
}