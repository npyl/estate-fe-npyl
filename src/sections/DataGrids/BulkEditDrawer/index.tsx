import { Drawer, Stack, Button, Typography, DrawerProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import Actions from "./Actions";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { useCallback } from "react";

interface BulkEditDrawerProps<State extends object, BulkEditReq>
    extends Omit<DrawerProps, "variant"> {
    variant: "property" | "customer";
    DEFAULT_VALUES: DefaultValues<State>;
    selectedIds: number[];
    onSave: (r: BulkEditReq) => Promise<void>;
    onClose: () => void;
}

const BulkEditDrawer = <State extends object, BulkEditReq>({
    variant,
    DEFAULT_VALUES,
    selectedIds,
    onSave,
    onClose,
    children,
}: BulkEditDrawerProps<State, BulkEditReq>) => {
    const { t } = useTranslation();

    const methods = useForm<State>({
        defaultValues: DEFAULT_VALUES,
    });

    const dirtyFields = methods.formState.dirtyFields;

    const onSubmit = useCallback(
        async (values: State) => {
            // Create an empty object to store changed fields
            const changed: Partial<State> = {};

            // Check each property in dirtyFields
            Object.keys(dirtyFields).forEach((key) => {
                const typedKey = key as keyof typeof dirtyFields;
                if (dirtyFields[typedKey]) {
                    const stateKey = key as keyof State;
                    changed[stateKey] = values[stateKey];
                }
            });

            const ids =
                variant === "property"
                    ? {
                          propertyIds: selectedIds,
                      }
                    : {
                          customerIds: selectedIds,
                      };

            const req = { ...changed, ...ids } as BulkEditReq;

            await onSave(req);

            onClose();
        },
        [variant, dirtyFields, selectedIds]
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
