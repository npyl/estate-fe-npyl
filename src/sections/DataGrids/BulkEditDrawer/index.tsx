import { Drawer, Stack, Button, Typography, DrawerProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import Actions from "./Actions";
import { FormProvider, useForm } from "react-hook-form";
import { useCallback } from "react";

interface BulkEditDrawerProps<State extends object, BulkEditReq>
    extends DrawerProps {
    DEFAULT_VALUES: State;
    selectedIds: number[];
    onSave: (r: BulkEditReq) => Promise<void>;
    onClose: () => void;
}

const BulkEditDrawer = <State extends object, BulkEditReq>({
    DEFAULT_VALUES,
    selectedIds,
    onSave,
    onClose,
    children,
}: BulkEditDrawerProps<State, BulkEditReq>) => {
    const { t } = useTranslation();

    const methods = useForm<State>({
        defaultValues: DEFAULT_VALUES as any,
    });

    const dirtyFields = methods.formState.dirtyFields;

    const onSubmit = useCallback(
        async (values: State) => {
            // Create an empty object to store changed fields
            const changed: Partial<State> = {};

            // Check each property in dirtyFields
            Object.keys(dirtyFields).forEach((key) => {
                // if (dirtyFields[key]) {
                //     changed[key] = values[key];
                // }
            });

            const req = {
                ...changed,
                propertyIds: selectedIds,
            } as BulkEditReq;

            await onSave(req);

            onClose();
        },
        [dirtyFields, selectedIds]
    );

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <Drawer
                    disablePortal
                    open
                    anchor="right"
                    onClose={onClose}
                    PaperProps={{
                        sx: {
                            p: 2,
                            width: "fit-content",
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                        },
                    }}
                >
                    <Typography variant="h6">{t("Bulk Edit")}</Typography>

                    <Stack mt={2} gap={4} height={1}>
                        {children}
                    </Stack>

                    <Stack direction="row" justifyContent="right" spacing={1}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onClose}
                        >
                            {t("Close")}
                        </Button>

                        <Actions DEFAULT_VALUES={DEFAULT_VALUES} />
                    </Stack>
                </Drawer>
            </FormProvider>
        </form>
    );
};

export default BulkEditDrawer;
