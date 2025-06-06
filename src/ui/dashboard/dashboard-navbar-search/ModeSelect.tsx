import {
    InputAdornment,
    MenuItem,
    Select,
    SelectProps,
    SxProps,
    Theme,
} from "@mui/material";
import SelectAllOutlinedIcon from "@mui/icons-material/SelectAllOutlined";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import HomeIcon from "@mui/icons-material/Home";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CustomersIcon from "@/assets/icons/customers";

const Empty = () => null;

const MenuItemSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1.5,
    alignItems: "center",
    color: "text.secondary",
    fontWeight: 500,
    marginInline: 0.8,

    "&:hover": {
        backgroundColor: "action.hover",
        borderRadius: "8px",
    },
    "&.Mui-selected": {
        borderRadius: "8px",
    },
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
                    <SelectAllOutlinedIcon
                        sx={{
                            color: "text.secondary",
                            fontSize: "large",
                        }}
                    />
                    {t("All")}
                </MenuItem>
                <MenuItem value="properties" sx={MenuItemSx}>
                    <HomeIcon
                        sx={{
                            color: "text.secondary",
                            fontSize: "large",
                        }}
                    />
                    {t("Properties")}
                </MenuItem>
                <MenuItem value="customers" sx={MenuItemSx}>
                    <CustomersIcon
                        sx={{
                            color: "text.secondary",
                            fontSize: "large",
                        }}
                    />
                    {t("Customers")}
                </MenuItem>
                <MenuItem value="agreements" sx={MenuItemSx}>
                    <HandshakeIcon
                        sx={{
                            color: "text.secondary",
                            fontSize: "large",
                        }}
                    />
                    {t("Agreements")}
                </MenuItem>
            </Select>
        </InputAdornment>
    );
};

export default ModeSelect;
