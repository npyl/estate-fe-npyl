import { SxProps, Theme } from "@mui/material/styles";

const SelectedSx: SxProps<Theme> = {
    borderColor: "info.main",
    zIndex: 10,
    boxShadow: 15,
};

const getAvatarSx = (selected: boolean): SxProps<Theme> => ({
    border: "2px solid",
    borderColor: "transparent",
    cursor: "pointer",
    "&:hover": SelectedSx,

    "&.MuiAvatarGroup-avatar": {
        borderWidth: "3px",
        ...(selected ? SelectedSx : {}),
    },
});

export { SelectedSx, getAvatarSx };
