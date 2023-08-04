import { Drawer, Stack, Button, Typography, DrawerProps } from "@mui/material";

interface BulkEditDrawerProps extends DrawerProps {
    open: boolean;
    changed: any;
    selectedIds: number[];
    onSave: () => void;
    onClose: () => void;
}

export const BulkEditDrawer = ({
    open,
    changed,
    selectedIds,
    onSave,
    onClose,
    children,
}: BulkEditDrawerProps) => {
    return (
        <Drawer
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
                <Typography variant="h6">Bulk Edit</Typography>

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
                        Cancel
                    </Button>
                    {Object.keys(changed).length > 0 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onSave}
                        >
                            Save
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Drawer>
    );
};
