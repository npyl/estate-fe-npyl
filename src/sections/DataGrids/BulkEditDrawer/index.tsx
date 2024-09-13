import { Drawer, Stack, Button, Typography, DrawerProps } from "@mui/material";
import { useTranslation } from "react-i18next";

interface BulkEditDrawerProps extends DrawerProps {
    open: boolean;
    changed: any;
    onSave: () => void;
    onClear: () => void;
    onClose: () => void;
}

export const BulkEditDrawer = ({
    open,
    changed,
    onSave,
    onClear,
    onClose,
    children,
}: BulkEditDrawerProps) => {
    const { t } = useTranslation();
    return (
        <Drawer
            open={open}
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

            <Stack mt={2} gap={4}>
                {children}
            </Stack>

            <Stack direction={"row"} justifyContent={"right"} spacing={1} m={1}>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    {t("Close")}
                </Button>

                {Object.keys(changed).length > 0 && (
                    <>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onClear}
                        >
                            {t("Clear")}
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onSave}
                        >
                            {t("Save")}
                        </Button>
                    </>
                )}
            </Stack>
        </Drawer>
    );
};
