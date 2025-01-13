type TConversationType = "DIRECT";

interface IConversation {
    id: string;
    type: TConversationType;
    participants: string[]; // userIds
    lastMessage: {
        content: string;
        createdAt: string;
    };
    createdAt: string;
    updatedAt: string;
}

type TMessageType = "TEXT" | "IMAGE" | "FILE";

interface IMessageRes {
    id: string;
    sender: string; // userId
    type: TMessageType;
    content: string;
    createdAt: string;
}

interface IMessageReq {
    conversationId: string;
    type: TMessageType;
    content: string;
}

export type {
    TConversationType,
    IConversation,
    TMessageType,
    IMessageReq,
    IMessageRes,
};
