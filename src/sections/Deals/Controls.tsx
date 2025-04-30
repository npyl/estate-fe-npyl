import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import VIEWS from "./Views";

interface ControlsProps {
    activeStep: number;
    onBack: VoidFunction;
    onNext: VoidFunction;
}

const Controls: FC<ControlsProps> = ({ activeStep, onBack, onNext }) => {
    if (activeStep === VIEWS.length)
        return (
            <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
            </Typography>
        );

    return (
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
                color="inherit"
                onClick={onBack}
                sx={{
                    mr: 1,
                    visibility: activeStep === 0 ? "hidden" : "visible",
                }}
            >
                Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={onNext}>
                {activeStep === VIEWS.length - 1 ? "Finish" : "Next"}
            </Button>
        </Box>
    );
};

export default Controls;
