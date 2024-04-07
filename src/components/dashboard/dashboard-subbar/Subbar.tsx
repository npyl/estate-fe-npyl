import { Button, MenuItem, Paper } from "@mui/material";
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

    const belowSm = useResponsive("down", "sm");

    return (
        <>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: 2,
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
            </Paper>
        </>
    );
};

export default Subbar;
