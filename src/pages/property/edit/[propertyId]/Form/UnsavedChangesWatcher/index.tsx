import { useTranslation } from "react-i18next";
import UnsavedChangesModal from "./UnsavedChangesModal";
import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import useDialog from "@/hooks/useDialog";

// Handle browser refresh/close with default prompt
const useBeforeUnload = (cb: (e: BeforeUnloadEvent) => void) => {
    useEffect(() => {
        window.addEventListener("beforeunload", cb);
        return () => {
            window.removeEventListener("beforeunload", cb);
        };
    }, [cb]);
};

// Handle in-app navigation
const useOnRouteChange = (cb: (url: string) => void) => {
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeStart", cb);
        return () => {
            router.events.off("routeChangeStart", cb);
        };
    }, [cb]);
};

interface Props {
    isDirty: boolean;
}

const UnsavedChangesWatcher: FC<Props> = ({ isDirty }) => {
    const { t } = useTranslation();

    const router = useRouter();

    const [isOpen, openModal, closeModal] = useDialog();

    const confirmationMessage = t(
        "You have unsaved changes. All changes will be lost. Are you sure?"
    );

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (isDirty) {
            e.preventDefault();
            return confirmationMessage;
        }
    };

    const handleRouteChangeStart = (url: string) => {
        // if (isDirty && !isNavigating && url !== router.asPath) {
        //     setNextRoute(url); // Store the next route
        //     openModal();
        //     router.events.emit("routeChangeError"); // Cancel the route change
        //     throw "Abort route change"; // Prevent navigation
        // }
    };

    useBeforeUnload(handleBeforeUnload);
    useOnRouteChange(handleRouteChangeStart);

    return null;
};

export default UnsavedChangesWatcher;
