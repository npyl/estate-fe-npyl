import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import VIEWS from "./Views";

const StepperSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    px: 10,
};

const getStep = (_: any, idx: number) => (
    <Step key={idx}>
        <StepLabel
            StepIconProps={{
                sx: { width: 60, height: 60 },
            }}
        />
    </Step>
);

interface Props {
    activeStep: number;
}

const Stepper: FC<Props> = ({ activeStep }) => (
    <MuiStepper
        activeStep={activeStep}
        connector={<ChevronRightIcon />}
        sx={StepperSx}
    >
        {VIEWS.map(getStep)}
    </MuiStepper>
);

export default Stepper;
