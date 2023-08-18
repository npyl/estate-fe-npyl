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
            key={open ? "opened" : "closed"} // INFO: trick to force drawer to reset state after close
            open={open}
            variant="persistent"
            anchor="right"
            onClose={onClose}
            ModalProps={{ sx: { zIndex: 999999 } }}
            PaperProps={{ sx: { width: 310 } }}
            sx={{
                "& .MuiDrawer-paper": open
                    ? {
                          borderRadius: 1,
                          position: "absolute",
                      }
                    : {}, // prevent horizontal scrollbar from exceeding page-content size
            }}
        >
            <Stack textAlign={"center"} flex={1} p={1} mt={1}>
                <Typography variant="h6">{t("Bulk Edit")}</Typography>

                <Stack mt={2} gap={1} spacing={1}>
                    {children}
                </Stack>

                <Stack
                    direction={"row"}
                    justifyContent={"right"}
                    spacing={1}
                    m={1}
                >
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onClose}
                    >
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
            </Stack>
        </Drawer>
    );
};
