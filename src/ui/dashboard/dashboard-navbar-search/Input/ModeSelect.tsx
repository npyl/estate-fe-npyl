import {
    InputAdornment,
    MenuItem,
    Select,
    SelectChangeEvent,
    SelectProps,
    SxProps,
    Theme,
} from "@mui/material";
import SelectAllOutlinedIcon from "@mui/icons-material/SelectAllOutlined";
import { useTranslation } from "react-i18next";
import { FC, useCallback } from "react";
import HomeIcon from "@mui/icons-material/Home";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CustomersIcon from "@/assets/icons/customers";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { TranslationType } from "@/types/translation";

// ---------------------------------------------------------------------------

const Empty = () => null;

// ---------------------------------------------------------------------------

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

    ".MuiSvgIcon-root": {
        color: "text.secondary",
        fontSize: "large",
    },
};

interface IOption {
    key: string;
    label: string;
    Icon: any;
}

const getOption =
    (t: TranslationType) =>
    ({ key, label, Icon }: IOption) => (
        <MenuItem key={key} value={key} sx={MenuItemSx}>
            <Icon />
            {t(label)}
        </MenuItem>
    );

// ---------------------------------------------------------------------------

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

const OPTIONS: IOption[] = [
    { key: "all", label: "All", Icon: SelectAllOutlinedIcon },
    { key: "properties", label: "Properties", Icon: HomeIcon },
    { key: "customers", label: "Customers", Icon: CustomersIcon },
    { key: "b2b", label: "B2B", Icon: CorporateFareIcon },
    { key: "agreements", label: "Agreements", Icon: HandshakeIcon },
];

interface ModeSelectProps extends Omit<SelectProps<string>, "onChange"> {
    onChange: (s: string) => void;
}

const ModeSelect: FC<ModeSelectProps> = ({ onChange: _onChange, ...props }) => {
    const { t } = useTranslation();
    const onChange = useCallback(
        (e: SelectChangeEvent) => _onChange?.(e.target.value),
        [_onChange]
    );
    return (
        <InputAdornment position="end">
            <Select
                sx={SelectSx}
                MenuProps={{ disableScrollLock: true }}
                IconComponent={Empty}
                onChange={onChange}
                {...props}
            >
                {OPTIONS.map(getOption(t))}
            </Select>
        </InputAdornment>
    );
};

export default ModeSelect;
