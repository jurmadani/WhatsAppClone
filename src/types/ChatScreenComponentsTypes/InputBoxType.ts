import { IChatRooms, IMessage } from "../redux/sliceTypes";

export interface InputBoxTypes {
    usersDidChatBefore: boolean;
    setDidUsersChatBefore: React.Dispatch<React.SetStateAction<boolean>>
    otherUserUniqueId: string;
    chatRoom: IChatRooms | undefined
    messagesArray: IMessage[]
    setMessagesArray: React.Dispatch<React.SetStateAction<IMessage[]>>

}