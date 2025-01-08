type TConversationType = "DIRECT";

interface IConversation {
    id: string;
    type: TConversationType;
    participants: number[]; // userIds
    createdAt: string;
    updatedAt: string;
}

export type { IConversation };
