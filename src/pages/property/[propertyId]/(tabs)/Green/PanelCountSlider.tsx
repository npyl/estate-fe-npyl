import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";

interface Props {
    value: number;
    maxPanelsAllowed: number;
    onChange: (c: number) => void;
}

const PanelCountSlider = ({ value, maxPanelsAllowed, onChange }: Props) => {
    const { t } = useTranslation();
    return (
        <Paper
            sx={{
                width: 240,
                position: "absolute",
                bottom: "10px",
                left: "50%",
                paddingX: 3,
                textAlign: "center",
                transform: "translateX(-50%)",
            }}
        >
            <Typography variant="caption">{`${t(
                "Panels"
            )} (${value})`}</Typography>
            <Slider
                onChange={(e, value) => onChange(value as number)}
                value={value}
                step={1}
                valueLabelDisplay="off"
                min={0}
                max={maxPanelsAllowed}
            />
        </Paper>
    );
};

export default PanelCountSlider;
