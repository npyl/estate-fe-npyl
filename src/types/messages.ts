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

// -----------------------------------------------------------------------

interface IRealtimeMessage {
    conversationId: string;
    messageId: string;
    sender: string;
    type: TMessageType;
    content: string;
    createdAt: string;
}

const RealtimeMessageToMessageRes = ({
    messageId,
    conversationId: _,
    content,
    createdAt,
    sender,
    type,
}: IRealtimeMessage) => ({
    id: messageId,
    content,
    createdAt,
    sender,
    type,
});

export type {
    TConversationType,
    IConversation,
    TMessageType,
    IMessageReq,
    IMessageRes,
    // ...
    IRealtimeMessage,
};

export { RealtimeMessageToMessageRes };
