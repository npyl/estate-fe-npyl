import { Menu, MenuProps } from "@mui/material";

import { alpha, styled } from "@mui/material/styles";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "text.secondary !important"
                : theme.palette.grey[200],
        fontWeight: "500 !important",
        "& .MuiMenuItem-root": {
            display: "flex",
            flexDirection: "row",
            gap: theme.spacing(1.5),

            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
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
