import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import VIEWS from "./Views";
import getBorderColor from "@/theme/borderColor";

const StepperSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",

    alignSelf: "center",
    justifyContent: "center",

    py: 2,

    width: "50%",

    "& .MuiStepIcon-root:not(.Mui-active, .Mui-completed)": {
        "& .MuiStepIcon-text": {
            fill: ({ palette: { mode } }) =>
                mode === "light" ? "grey" : "white",
        },

        color: "transparent",
        border: "2px solid",
        borderColor: getBorderColor,
        borderRadius: "50%",
    },
};

const getStep = (_: any, idx: number) => (
    <Step key={idx}>
        <StepLabel
            StepIconProps={{
                sx: {
                    width: 60,
                    height: 60,
                },
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
