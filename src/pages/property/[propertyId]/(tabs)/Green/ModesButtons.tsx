import {
    ToggleButtonGroup,
    ToggleButton as MuiToggleButton,
    IconButton,
} from "@mui/material";
import {
    Brightness4,
    WbSunny,
    EnergySavingsLeaf,
    ArrowDropDown,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",

    "&.Mui-selected": {
        "&: hover": {
            backgroundColor: "white",
        },
        backgroundColor: "white",
    },
    "&: hover": {
        backgroundColor: "white",
    },
}));

interface ModeButtonsProps {
    alignment: string;
    onClick: (_: any, newAlignment: string) => void;
}

const ModesButtons = ({ alignment, onClick }: ModeButtonsProps) => (
    <ToggleButtonGroup
        sx={{
            position: "absolute",
            top: "70px",
            left: "20px",
            "& .MuiToggleButton-root": {
                width: "100px", // Adjust button width as needed
                height: "40px", // Adjust button height as needed
                fontSize: "14px", // Adjust font size as needed
                backgroundColor: "white", // White background color
                display: "flex",
                flexDirection: "row",
            },
            "& .MuiToggleButtonGroup-grouped": {
                borderRadius: "20px", // Adjust the border radius as needed
                marginTop: "10px", // Spacing between buttons
            },
        }}
        orientation="vertical"
        color="primary"
        value={alignment}
        exclusive
        onChange={onClick}
    >
        <ToggleButton value="energy">
            <Brightness4 />
            <IconButton>
                <ArrowDropDown />
            </IconButton>
        </ToggleButton>
        <ToggleButton value="solar">
            <WbSunny />
            <IconButton>
                <ArrowDropDown />
            </IconButton>
        </ToggleButton>
        <ToggleButton value="air_quality">
            <EnergySavingsLeaf />
            <IconButton>
                <ArrowDropDown />
            </IconButton>
        </ToggleButton>
    </ToggleButtonGroup>
);

export default ModesButtons;
