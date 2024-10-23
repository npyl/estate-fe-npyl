import {
    Autocomplete,
    AutocompleteProps,
    MenuItem,
    SxProps,
    TextField,
    Theme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setCode } from "src/slices/filters";
import { useSelector } from "react-redux";
import { useAllPropertyCodesQuery } from "src/services/properties";
import { selectCode } from "src/slices/filters";
import { useTranslation } from "react-i18next";
import { FC, useMemo } from "react";
import HomeIcon from "@mui/icons-material/Home";

// ------------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: string
) => (
    <MenuItem key={option} sx={OptionSx} {...props}>
        <img
            src={"/static/categoryPhotos/home.webp"}
            alt="Home"
            style={{ width: 30, height: 30 }}
        />
        {/*  HOME HERE */}
        {option}
    </MenuItem>
);

// ------------------------------------------------------------------------

type CodeSelectProps = Omit<
    AutocompleteProps<string, false, true, false>,
    "options"
>;

const CodeSelect: FC<CodeSelectProps> = (props) => {
    const { t } = useTranslation();

    const { data, isLoading } = useAllPropertyCodesQuery();
    const codes = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    return (
        <Autocomplete
            loading={isLoading}
            disableClearable
            renderOption={RenderOption}
            options={codes}
            slotProps={{
                paper: {
                    sx: {
                        width: "fit-content",
                    },
                },
            }}
            {...props}
        />
    );
};

export default CodeSelect;
