import { useTranslation } from "react-i18next";
import UnsavedChangesModal from "./UnsavedChangesModal";
import { useCallback, useEffect, useState } from "react";
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

const UnsavedChangesWatcher = () => {
    const { t } = useTranslation();

    const router = useRouter();

    const [isOpen, openModal, closeModal] = useDialog();
    const [nextRoute, setNextRoute] = useState("");

    const handleConfirm = () => {
        closeModal();

        if (nextRoute) {
            router.push(nextRoute);
        }
    };

    const handleCancel = () => {
        closeModal();
        setNextRoute("");
    };

    const handleBeforeUnload = useCallback(
        (e: BeforeUnloadEvent) => {
            e.preventDefault();

            const confirmationMessage = t(
                "You have unsaved changes. All changes will be lost. Are you sure?"
            );

            return confirmationMessage;
        },
        [t]
    );

    const handleRouteChangeStart = useCallback(
        (url: string) => {
            if (nextRoute || url === router.asPath) return;
            openModal();
            setNextRoute(url);
            router.events.emit("routeChangeError"); // Cancel the route change
            throw "Abort route change"; // Prevent navigation
        },
        [nextRoute, router.asPath]
    );

    useBeforeUnload(handleBeforeUnload);
    useOnRouteChange(handleRouteChangeStart);

    return (
        <>
            {isOpen ? (
                <UnsavedChangesModal
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            ) : null}
        </>
    );
};

export default UnsavedChangesWatcher;
