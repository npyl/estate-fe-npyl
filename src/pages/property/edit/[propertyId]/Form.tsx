import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { Residential, Commercial, Land, Other } from "./forms";
import FormProvider from "src/components/hook-form";
import usePropertyForm, { fixDropdowns } from "./hook";
import { IProperties, IPropertiesPOST } from "src/types/properties";
import UnsavedChangesModal from "./UnsavedChangesModal";

interface IFormProps {
    property?: IProperties;
    isLoading: boolean;
    isError: boolean;
    onClear: () => void;
    onSave: (body: IPropertiesPOST) => void;
    onCancel: () => void;
}

export default function Form({
    property,
    isLoading,
    isError,
    onSave,
    onClear,
    onCancel,
}: IFormProps) {
    const { t } = useTranslation();
    const router = useRouter();

    const { methods, handleSubmit, reset } = usePropertyForm(property);
    const { isDirty } = methods.formState; //it is set to true after the user modifies any of the inputs inside the form.

    const [openModal, setOpenModal] = useState(false);
    const [nextRoute, setNextRoute] = useState<string | null>(null);
    const [isNavigating, setIsNavigating] = useState(false);

    const onSubmit = handleSubmit((data) => {
        try {
            onSave({
                ...(data as IPropertiesPOST),
                ...(fixDropdowns(data as IPropertiesPOST) as IPropertiesPOST),
            });

            methods.reset(data); // Reset the form so it's not dirty anymore
            setIsNavigating(true); // Allow navigation without triggering the modal
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    const handleClear = () => {
        reset();
        onClear();
    };

    // Handle browser refresh/close with default prompt
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                const confirmationMessage = t(
                    "You have unsaved changes. All changes will be lost. Are you sure?"
                );
                e.preventDefault();
                // e.returnValue = confirmationMessage; //Deprecated
                return confirmationMessage;
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isDirty, t]);

    // Handle in-app navigation
    useEffect(() => {
        const handleRouteChangeStart = (url: string) => {
            if (isDirty && !isNavigating && url !== router.asPath) {
                setNextRoute(url); // Store the next route
                setOpenModal(true);
                router.events.emit("routeChangeError"); // Cancel the route change
                throw "Abort route change"; // Prevent navigation
            }
        };
        router.events.on("routeChangeStart", handleRouteChangeStart);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
        };
    }, [isDirty, router.asPath, isNavigating, router.events]);

    const handleConfirmLeave = () => {
        setOpenModal(false);
        setIsNavigating(true); // Allow routing to proceed
        if (nextRoute) {
            router.push(nextRoute);
        }
    };

    const handleCancelLeave = () => {
        setOpenModal(false);
        setNextRoute(null);
        setIsNavigating(false);
    };

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            {!!property ? (
                <>
                    {property.parentCategory?.key === "RESIDENTIAL" && (
                        <Residential />
                    )}
                    {property.parentCategory?.key === "COMMERCIAL" && (
                        <Commercial />
                    )}
                    {property.parentCategory?.key === "LAND" && <Land />}
                    {property.parentCategory?.key === "OTHER" && <Other />}
                </>
            ) : null}

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
                mt={2}
                sx={{
                    backgroundColor: "rgba(128, 128, 128, 0.1)",
                    width: "100%",
                    p: 0.5,
                    alignSelf: "flex-end",
                    borderRadius: "10px",
                    position: "sticky",
                    zIndex: 1000,
                    bottom: 1,
                }}
            >
                <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={onCancel}
                >
                    {t("Cancel")}
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={handleClear}
                >
                    {t("Clear")}
                </Button>

                <LoadingButton
                    loading={isLoading && !isError}
                    variant="contained"
                    startIcon={<SendIcon />}
                    type="submit"
                >
                    {t("Save")}
                </LoadingButton>
            </Stack>

            {/* Unsaved Changes Modal */}
            <UnsavedChangesModal
                open={openModal}
                onConfirm={handleConfirmLeave}
                onCancel={handleCancelLeave}
            />
        </FormProvider>
    );
}
