import {
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useGlobals } from "@/sections/useGlobals";

interface OptionsProps {
    styling: boolean;
    improveOption: string;

    onStylingChange: (b: boolean) => void;
    onImproveOptionChange: (s: string) => void;
}

const Options: FC<OptionsProps> = ({
    styling,
    improveOption,
    onStylingChange,
    onImproveOptionChange,
}) => {
    const { t } = useTranslation();

    const options = useGlobals();
    const improvementOptions = options?.property?.descriptionImprovementOptions;

    const handleStylingChange = (_: any, b: boolean) => onStylingChange(b);
    const handleImproveOptionChange = (e: SelectChangeEvent) =>
        onImproveOptionChange(e.target.value);

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            p={1}
            width="fit-content"
        >
            <Typography variant="body2" color="textSecondary" maxWidth="300px">
                {t("Improving the description to be more:")}
            </Typography>

            <Select value={improveOption} onChange={handleImproveOptionChange}>
                {improvementOptions?.map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                        {t(option.value)}
                    </MenuItem>
                ))}
            </Select>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={styling}
                        onChange={handleStylingChange}
                    />
                }
                label={t("RTF")}
            />
        </Stack>
    );
};

export default Options;
