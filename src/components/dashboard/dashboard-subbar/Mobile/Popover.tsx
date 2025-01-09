import MuiPopover from "@mui/material/Popover";
import { StyledMenuItem } from "./styled";
import { itemTypeToPath, MENU_ITEMS } from "../constants";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { TMenuItem } from "../types";

const MobileMenuItem: FC<TMenuItem> = ({ label, path, icon }) => {
    const { t } = useTranslation();

    const router = useRouter();
    const startCreate = useCallback(
        () => router.push(itemTypeToPath[path]),
        []
    );

    return (
        <StyledMenuItem onClick={startCreate} disableRipple>
            {icon}
            {t(label)}
        </StyledMenuItem>
    );
};

const getMenuItem = (props: TMenuItem) => (
    <MobileMenuItem key={props.path} {...props} />
);

interface PopoverProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, onClose }) => (
    <MuiPopover
        open
        anchorEl={anchorEl}
        anchorOrigin={{
            horizontal: "center",
            vertical: "top",
        }}
        keepMounted
        onClose={onClose}
        slotProps={{
            paper: {
                elevation: 0,
                sx: {
                    overflow: "visible",
                    background: "transparent",
                    border: 0,
                    // ...
                    display: "flex",
                    flexDirection: " row",
                    gap: 0.5,
                    // ...
                    flexWrap: "wrap",
                },
            },
        }}
    >
        {MENU_ITEMS.map(getMenuItem)}
    </MuiPopover>
);

export default Popover;
