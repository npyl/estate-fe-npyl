import { Box, Paper, Stack } from "@mui/material";
import { PropsWithChildren } from "react";

import ExportButton from "./Export";
import MoreButton from "./More";

interface IViewHeaderProps extends PropsWithChildren {
    isProperty: boolean;
    isArchived: boolean;
    // ...
    onEdit: VoidFunction;
    onArchive: VoidFunction;
    onDelete: VoidFunction;
    onClone?: VoidFunction;
}

const ViewHeader = ({
    isProperty,
    isArchived,
    children,
    // ...
    onEdit,
    onArchive,
    onDelete,
    onClone,
}: IViewHeaderProps) => (
    <Paper
        sx={{
            borderColor: "divider",
            paddingLeft: 2,
            paddingRight: 1,
        }}
    >
        <Stack direction="row" alignItems="center">
            <Box width={1} overflow="auto hidden" whiteSpace="nowrap">
                <Stack direction="row" minWidth="max-content">
                    {children}
                </Stack>
            </Box>

            <Stack direction="row" spacing={1}>
                {isProperty ? <ExportButton /> : null}
                <MoreButton
                    isProperty={isProperty}
                    isArchived={isArchived}
                    // ...
                    onEdit={onEdit}
                    onArchive={onArchive}
                    onDelete={onDelete}
                    onClone={onClone}
                />
            </Stack>
        </Stack>
    </Paper>
);

export default ViewHeader;
