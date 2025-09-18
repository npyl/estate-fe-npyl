import SoftButton, { SoftButtonProps } from "@/components/SoftButton";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { HideText } from "@/components/styled";
import SelectAllIcon from "@mui/icons-material/SelectAll";

interface SelectAllButtonProps
    extends Omit<SoftButtonProps, "variant" | "color" | "children"> {
    active: boolean;
}

const SelectAllButton: FC<SelectAllButtonProps> = ({
    active,
    sx,
    ...props
}) => {
    const { t } = useTranslation();
    return (
        <SoftButton
            variant="outlined"
            color={active ? "error" : "primary"}
            endIcon={<SelectAllIcon />}
            sx={{ ...(HideText as any), ...sx }}
            {...props}
        >
            {t(active ? "Deselect All" : "Select All")}
        </SoftButton>
    );
};

export default SelectAllButton;
