import { Box, Paper, Stack } from "@mui/material";
import { ReactNode } from "react";

import ExportButton from "./Export";
import MoreButton from "./More";

interface IViewHeaderProps {
    onEdit: VoidFunction;
    onDelete: VoidFunction;
    onClone?: VoidFunction;
    children?: ReactNode;
}

const ViewHeader = ({
    children,
    onEdit,
    onDelete,
    onClone,
}: IViewHeaderProps) => {
    return (
        <Paper
            sx={{
                borderColor: "divider",
                paddingLeft: 2,
                paddingRight: 1,
            }}
        >
            <Stack flexDirection="row" alignItems="center">
                <Box
                    sx={{
                        width: "100%",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                    }}
                >
                    <Stack
                        flex={1}
                        flexDirection="row"
                        sx={{ minWidth: "max-content" }}
                    >
                        {children}
                    </Stack>
                </Box>

                <Stack direction="row" spacing={1}>
                    <ExportButton />
                    <MoreButton
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onClone={onClone}
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ViewHeader;
