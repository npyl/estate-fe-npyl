import { useCallback, useState } from "react";
import Container from "@mui/material/Container";
import { Paper, SxProps, Theme } from "@mui/material";
import Form from "./Form";
import Controls from "./Controls";
import View from "./View";
import Stepper from "./Stepper";

const PaperSx: SxProps<Theme> = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    gap: 2,
};

const Deals = () => {
    const [activeStep, setActiveStep] = useState(0);

    const onNext = useCallback(() => setActiveStep((s) => s + 1), []);
    const onBack = useCallback(() => setActiveStep((s) => s - 1), []);

    return (
        <Container maxWidth="sm">
            <Paper sx={PaperSx}>
                <Stepper activeStep={activeStep} />

                <Form>
                    <View idx={activeStep} />
                </Form>

                <Controls
                    activeStep={activeStep}
                    onBack={onBack}
                    onNext={onNext}
                />
            </Paper>
        </Container>
    );
};

export default Deals;
