import {
    Box,
    Button,
    Fab,
    MenuItem,
    Paper,
    Popover,
    Stack,
} from "@mui/material";
import { MouseEvent, useState, useCallback } from "react";
import StyledMenu from "@/components/StyledMenu";
import SubbarItems from "./Items";
import { useTranslation } from "react-i18next";
import { BsPlusCircle } from "react-icons/bs";
import useAutosaveRouter from "@/components/Router/Autosave";

import HomeIcon from "@mui/icons-material/Home";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Users as UsersIcon } from "@/icons/users";
import useResponsive from "@/hooks/useResponsive";

import AddIcon from "@mui/icons-material/Add";

import { styled } from "@mui/material/styles";
import getBorderColor from "@/theme/borderColor";

const propertyItemType = "property-menu-item";
const managerItemType = "manager-menu-item";
const ownerItemType = "owner-menu-item";
const labelItemType = "label-menu-item";

const itemTypeToPath: { [key: string]: string } = {
    [propertyItemType]: "/property/create",
    [ownerItemType]: "/customer/create",
    [labelItemType]: "/label",
    [managerItemType]: "/user/create",
};

const MENU_ITEMS = [
    {
        label: "Property",
        path: propertyItemType,
        icon: <HomeIcon />,
    },
    {
        label: "Customer",
        path: ownerItemType,
        icon: <UsersIcon />,
    },
    {
        label: "Label",
        path: labelItemType,
        icon: <LabelImportantIcon />,
    },
    {
        label: "Manager",
        path: managerItemType,
        icon: <ManageAccountsIcon />,
    },
];

// --------------------------------------------------------

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor(theme),
    boxShadow: theme.shadows[18],
    "&:hover": {
        backgroundColor: theme.palette.background.paper,
    },
}));

// --------------------------------------------------------

interface FabMenuProps {
    onClick: (path: string) => void;
}

const FabMenu = ({ onClick }: FabMenuProps) => {
    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = useState<HTMLElement>();
    const isOpen = Boolean(anchorEl);

    const openPopover = useCallback(
        (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget),
        []
    );
    const closePopover = useCallback(() => setAnchorEl(undefined), []);

    return (
        <>
            <Fab
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: 30,
                    right: 30,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.45)",
                }}
                onClick={openPopover}
            >
                <AddIcon />
            </Fab>

            {isOpen ? (
                <Popover
                    open={isOpen}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        horizontal: "center",
                        vertical: "top",
                    }}
                    keepMounted
                    onClose={closePopover}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                background: "transparent",
                                border: 0,
                            },
                        },
                    }}
                >
                    <Stack direction="row" gap={0.5} flexWrap="wrap">
                        {MENU_ITEMS.map(({ label, path, icon }, i) => (
                            <StyledMenuItem
                                sx={{
                                    backgroundColor: "background.paper",
                                    borderRadius: "15px",
                                }}
                                key={i}
                                onClick={() => {
                                    onClick(path);
                                    closePopover();
                                }}
                                disableRipple
                            >
                                {icon}
                                {t(label)}
                            </StyledMenuItem>
                        ))}
                    </Stack>
                </Popover>
            ) : null}
        </>
    );
};

const Subbar = () => {
    const { t } = useTranslation();
    const router = useAutosaveRouter();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const showDropdown = useCallback(
        (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget),
        []
    );
    const hideDropdown = useCallback(() => setAnchorEl(null), []);

    const startCreate = useCallback(
        (itemType: string) => router.push(itemTypeToPath[itemType]),
        []
    );

    const belowLg = useResponsive("down", "lg");

    return (
        <>
            {belowLg ? (
                <FabMenu onClick={startCreate} />
            ) : (
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                        p: 1,
                    }}
                >
                    <SubbarItems overflow="auto hidden" />

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<BsPlusCircle />}
                        onClick={showDropdown}
                        sx={{
                            color: "white",
                            fontSize: "16px",
                            borderRadius: "5px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        {t("Create")}
                    </Button>
                </Paper>
            )}

            {open ? (
                <StyledMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={hideDropdown}
                >
                    {MENU_ITEMS.map(({ label, path, icon }, i) => (
                        <MenuItem
                            key={i}
                            onClick={() => {
                                startCreate(path);
                                hideDropdown();
                            }}
                            disableRipple
                        >
                            {icon}
                            {t(label)}
                        </MenuItem>
                    ))}
                </StyledMenu>
            ) : null}
        </>
    );
};

export default Subbar;
