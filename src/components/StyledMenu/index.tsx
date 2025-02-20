import { Menu, MenuProps } from "@mui/material";

import { alpha, styled } from "@mui/material/styles";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 8,
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "text.secondary !important"
                : theme.palette.grey[200],
        fontWeight: "500 !important",
        "& .MuiMenu-list": {
            padding: "4px 6px",
            borderRadius: "8px",
        },
        "& .MuiMenuItem-root": {
            borderRadius: "8px",

            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

export default StyledMenu;
