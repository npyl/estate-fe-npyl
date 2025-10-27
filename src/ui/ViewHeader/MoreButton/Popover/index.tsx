import { Button, Stack } from "@mui/material";
import MuiPopover from "@mui/material/Popover";
import dynamic from "next/dynamic";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RestoreButton from "./RestoreButton";
import DeleteOrArchiveButton from "./DeleteOrArchiveButton";
import { useTranslation } from "react-i18next";
import { FC, useCallback, useRef } from "react";
const PropertyTaskButton = dynamic(() => import("./PropertyTaskButton"));
const CustomerTaskButton = dynamic(() => import("./CustomerTaskButton"));
const OpenIn = dynamic(() => import("./OpenIn"));

interface PopoverProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;

    isProperty: boolean;
    isArchived: boolean;
    isCustomer: boolean;
    onEdit: VoidFunction;
    onDelete: VoidFunction;
    onArchive?: VoidFunction;
    onClone?: VoidFunction;
}

const Popover: FC<PopoverProps> = ({
    anchorEl,
    onClose,
    // ...
    isProperty,
    isArchived,
    isCustomer,
    onEdit,
    onDelete,
    onArchive,
    onClone,
}) => {
    const { t } = useTranslation();

    const paperRef = useRef<HTMLDivElement>(null);

    const handleEdit = useCallback(() => {
        onClose();
        onEdit();
    }, [onEdit]);
    const handleClone = useCallback(() => {
        onClose();
        onClone?.();
    }, [onClone]);
    const handleDelete = useCallback(() => {
        onClose();
        onDelete();
    }, [onDelete]);
    const handleArchive = useCallback(() => {
        onClose();
        onArchive?.();
    }, [onArchive]);

    return (
        <MuiPopover
            open
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            slotProps={{ paper: { ref: paperRef } }}
        >
            <Stack
                alignItems="center"
                justifyContent="flex-start"
                p={1}
                spacing={1}
                sx={{ minWidth: 150 }}
            >
                {isProperty && paperRef.current ? (
                    <OpenIn menuAnchor={paperRef.current} />
                ) : null}

                {!isArchived && onClone ? (
                    <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        startIcon={<ControlPointDuplicateOutlinedIcon />}
                        onClick={handleClone}
                        sx={{ justifyContent: "flex-start" }}
                    >
                        {t("Clone")}
                    </Button>
                ) : null}

                {!isArchived ? (
                    <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={handleEdit}
                        startIcon={<EditOutlinedIcon />}
                        sx={{ justifyContent: "flex-start" }}
                    >
                        {t("Edit")}
                    </Button>
                ) : null}

                {isProperty ? <PropertyTaskButton /> : null}
                {isCustomer ? <CustomerTaskButton /> : null}

                {isArchived ? <RestoreButton /> : null}

                <DeleteOrArchiveButton
                    isProperty={isProperty}
                    isArchived={isArchived}
                    onDelete={handleDelete}
                    onArchive={handleArchive}
                />
            </Stack>
        </MuiPopover>
    );
};

export type { PopoverProps };
export default Popover;
