import { Button, Stack } from "@mui/material";
import MuiPopover from "@mui/material/Popover";
import OpenIn from "./OpenIn";
import dynamic from "next/dynamic";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RestoreButton from "./RestoreButton";
import DeleteOrArchiveButton from "./DeleteOrArchiveButton";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import toNumberSafe from "@/utils/toNumberSafe";
import { FC, useCallback } from "react";
const PropertyTaskButton = dynamic(() => import("./PropertyTaskButton"));
const CustomerTaskButton = dynamic(() => import("./CustomerTaskButton"));

interface PopoverProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;

    isProperty: boolean;
    isArchived: boolean;
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
    onEdit,
    onDelete,
    onArchive,
    onClone,
}) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { customerId } = router.query;
    const isCustomer = toNumberSafe(customerId) !== -1;

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
        >
            <Stack
                alignItems="center"
                justifyContent="flex-start"
                p={1}
                spacing={1}
                sx={{ minWidth: 150 }}
            >
                {isProperty && <OpenIn />}

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
