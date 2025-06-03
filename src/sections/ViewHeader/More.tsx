import { Button, IconButton, Popover, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import useDialog from "@/hooks/useDialog";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useCallback, useRef } from "react";
import OpenIn from "./OpenIn";
import dynamic from "next/dynamic";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RestoreButton from "./RestoreButton";
import DeleteOrArchiveButton from "./DeleteOrArchiveButton";
import { useRouter } from "next/router";
import { toNumberSafe } from "@/utils/toNumber";
const PropertyTaskButton = dynamic(() => import("./PropertyTaskButton"));
const CustomerTaskButton = dynamic(() => import("./CustomerTaskButton"));

interface MoreButtonProps {
    isProperty: boolean;
    isArchived: boolean;
    onEdit: VoidFunction;
    onDelete: VoidFunction;
    onArchive?: VoidFunction;
    onClone?: VoidFunction;
}

const MoreButton = ({
    isProperty,
    isArchived,
    onEdit,
    onDelete,
    onArchive,
    onClone,
}: MoreButtonProps) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { customerId } = router.query;
    const isCustomer = toNumberSafe(customerId) !== -1;

    const anchorRef = useRef(null);

    const [isOpen, openPopover, closePopover] = useDialog();

    const handleEdit = useCallback(() => {
        closePopover();
        onEdit();
    }, [onEdit]);
    const handleClone = useCallback(() => {
        closePopover();
        onClone?.();
    }, [onClone]);
    const handleDelete = useCallback(() => {
        closePopover();
        onDelete();
    }, [onDelete]);
    const handleArchive = useCallback(() => {
        closePopover();
        onArchive?.();
    }, [onArchive]);

    return (
        <>
            <IconButton ref={anchorRef} size="small" onClick={openPopover}>
                <MoreVertOutlinedIcon />
            </IconButton>

            {isOpen ? (
                <Popover
                    open
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
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
                                startIcon={
                                    <ControlPointDuplicateOutlinedIcon />
                                }
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
                </Popover>
            ) : null}
        </>
    );
};

export default MoreButton;
