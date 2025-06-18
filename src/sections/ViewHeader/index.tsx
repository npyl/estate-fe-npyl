import { Paper, Stack, SxProps, Theme } from "@mui/material";
import { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
const ExportButton = dynamic(() => import("./Export"));
const ShareButton = dynamic(() => import("./ShareButton"));
const DownloadGoogleEarthButton = dynamic(
    () => import("./DownloadGoogleEarthButton")
);
import MoreButton from "./More";

const PaperSx: SxProps<Theme> = {
    borderColor: "divider",
    paddingLeft: 2,
    paddingRight: 1,
    display: "flex",
    direction: "row",
    justifyContent: "space-between",
    gap: 2,
};

interface IViewHeaderProps extends PropsWithChildren {
    isProperty: boolean;
    isArchived?: boolean;
    // ...
    onEdit: VoidFunction;
    onArchive?: VoidFunction;
    onDelete: VoidFunction;
    onClone?: VoidFunction;
}

const ViewHeader = ({
    isProperty,
    isArchived = false,
    children,
    // ...
    onEdit,
    onArchive,
    onDelete,
    onClone,
}: IViewHeaderProps) => (
    <Paper sx={PaperSx}>
        {children}

        <Stack alignItems="center" direction="row" spacing={1}>
            {isProperty ? <DownloadGoogleEarthButton /> : null}
            {isProperty ? <ExportButton /> : null}
            <ShareButton />
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
    </Paper>
);

export default ViewHeader;
