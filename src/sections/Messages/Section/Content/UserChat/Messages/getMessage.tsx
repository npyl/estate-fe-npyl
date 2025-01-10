import { IMessageRes } from "@/types/messages";
import dynamic from "next/dynamic";
const Message = dynamic(() => import("./Message"));

const getMessage = (currentUserId: number) => (m: IMessageRes) =>
    <Message key={m.id} currentUserId={currentUserId} m={m} />;

export default getMessage;
