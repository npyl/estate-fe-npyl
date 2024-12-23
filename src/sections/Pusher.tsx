import { useTabsContext } from "@/contexts/tabs";
import { ITab } from "@/types/tabs";
import { FC, useEffect } from "react";

interface PusherProps {
    tab: ITab;
}

const Pusher: FC<PusherProps> = ({ tab }) => {
    const { pushTab } = useTabsContext();

    useEffect(() => {
        pushTab(tab);
    }, []);

    return null;
};

export default Pusher;
