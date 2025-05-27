import useNetworkAccess from "@/_private/useNetworkAccess";
import instantDismiss from "@/components/Toaster/instantDismiss";
import Message, { MessageProps } from "@/components/Toaster/Message";
import { FC, useCallback, useLayoutEffect, useRef } from "react";

import orgToast from "react-hot-toast";

interface SuccessMessageProps extends MessageProps {
    disconnectToastId?: string;
}

const SuccessMessage: FC<SuccessMessageProps> = ({
    disconnectToastId,
    ...props
}) => {
    useLayoutEffect(() => {
        if (!disconnectToastId) return;
        instantDismiss(disconnectToastId);
    }, [disconnectToastId]);

    return <Message {...props} />;
};

const connectToast = (disconnectToastId?: string) =>
    orgToast(
        <SuccessMessage
            main="Online0"
            secondary="Online1"
            disconnectToastId={disconnectToastId}
        />,
        {
            duration: 30000,
        }
    );

const disconnectToast = () =>
    orgToast(<Message main="Offline0" secondary="Offline1" />, {
        duration: Infinity,
    });

const NetworkListener = () => {
    const disconnectToastId = useRef<string>();

    const onChange = useCallback((online: boolean) => {
        if (online) {
            connectToast(disconnectToastId.current);
        } else {
            disconnectToastId.current = disconnectToast();
        }
    }, []);

    useNetworkAccess(onChange);

    return null;
};

export default NetworkListener;
