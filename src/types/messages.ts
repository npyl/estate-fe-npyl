type TConversationType = "DIRECT";

interface IConversation {
    id: string;
    type: TConversationType;
    participants: number[]; // userIds
    createdAt: string;
    updatedAt: string;
}

type TMessageType = "TEXT";

interface IMessageRes {
    id: string;
    sender: number; // userId
    type: TMessageType;
    content: string;
    createdAt: string;
}

export type { IConversation, IMessageRes };
