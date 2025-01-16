import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
    InputAdornment,
    MenuItem,
    Select,
    SelectProps,
    SxProps,
    Theme,
} from "@mui/material";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import SelectAllOutlinedIcon from "@mui/icons-material/SelectAllOutlined";
import { useTranslation } from "react-i18next";
import { FC } from "react";

const Empty = () => null;

const MenuItemSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
};

const SelectSx: SxProps<Theme> = {
    borderLeft: "1px solid",
    borderColor: "divider",
    borderRadius: 0,
    width: { xs: "50px", sm: "min-content", md: "130px" },

    ".MuiOutlinedInput-input": {
        display: "flex",
        gap: 1,
        alignItems: "center",
    },
    ".MuiOutlinedInput-notchedOutline": {
        border: 0,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: 0,
    },
};

const ModeSelect: FC<SelectProps> = (props) => {
    const { t } = useTranslation();
    return (
        <InputAdornment position="end">
            <Select
                sx={SelectSx}
                MenuProps={{ disableScrollLock: true }}
                IconComponent={Empty}
                {...props}
            >
                <MenuItem value="all" sx={MenuItemSx}>
                    <SelectAllOutlinedIcon />
                    {t("All")}
                </MenuItem>
                <MenuItem value="properties" sx={MenuItemSx}>
                    <HomeOutlinedIcon />
                    {t("Properties")}
                </MenuItem>
                <MenuItem value="customers" sx={MenuItemSx}>
                    <PersonOutlineOutlinedIcon />
                    {t("Customers")}
                </MenuItem>
                <MenuItem value="agreements" sx={MenuItemSx}>
                    <HandshakeOutlinedIcon />
                    {t("Agreements")}
                </MenuItem>
            </Select>
        </InputAdornment>
    );
};

export default ModeSelect;
