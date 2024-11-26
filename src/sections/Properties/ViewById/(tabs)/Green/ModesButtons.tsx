import {
    ToggleButtonGroup as MuiToggleButtonGroup,
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

const ToggleButton = styled(MuiToggleButton)({
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
});

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
    position: "absolute",
    top: "70px",
    left: "20px",
    "& .MuiToggleButton-root": {
        width: "100px",
        height: "40px",
        fontSize: "14px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
    },
    "& .MuiToggleButtonGroup-grouped": {
        borderRadius: "20px",
        marginTop: "10px",
        borderColor: theme.palette.neutral?.[500],
    },
}));

interface ModeButtonsProps {
    alignment: string;
    onClick: (_: any, newAlignment: string) => void;
}

const ModesButtons = ({ alignment, onClick }: ModeButtonsProps) => (
    <ToggleButtonGroup
        orientation="vertical"
        color="primary"
        value={alignment}
        exclusive
        onChange={(_, a) => a !== null && onClick(_, a)} // Make sure we do not untoggle
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
