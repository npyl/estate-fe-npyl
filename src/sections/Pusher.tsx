import { useTabsContext } from "@/contexts/tabs";
import { ITab } from "@/types/tabs";
import { FC, useEffect } from "react";

interface PusherProps {
    tabPromise: Promise<ITab>;
}

const Pusher: FC<PusherProps> = ({ tabPromise }) => {
    const { pushTab } = useTabsContext();

    useEffect(() => {
        tabPromise.then(pushTab);
    }, [tabPromise]);

    return null;
};

export default Pusher;
