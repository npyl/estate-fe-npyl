import { useTabsContext } from "@/contexts/tabs";
import { ITab } from "@/types/tabs";
import { FC, useEffect } from "react";

interface PusherProps {
    tab: ITab;
}

/**
 * Component that works as a tab pusher; Intended for using on a layout (e.g. inside DashboardLayout)
 * @param tab The tab you wish to push the the subbar
 */
const Pusher: FC<PusherProps> = ({ tab }) => {
    const { pushTab } = useTabsContext();

    useEffect(() => {
        pushTab(tab);
    }, []);

    return null;
};

export default Pusher;
