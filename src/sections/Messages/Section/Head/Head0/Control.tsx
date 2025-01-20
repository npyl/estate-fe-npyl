import dynamic from "next/dynamic";
import useChatService from "@/sections/Messages/useChatService";
const DisconnectedIndicator = dynamic(() => import("./DisconnectedIndicator"));
const CreateButton = dynamic(() => import("./CreateButton"));

const Control = () => {
    const { isConnected } = useChatService();

    if (!isConnected) return <DisconnectedIndicator />;

    return <CreateButton />;
};

export default Control;
