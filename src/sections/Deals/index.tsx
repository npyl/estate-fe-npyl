import { useCallback, useState } from "react";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import Form from "./Form";
import Controls from "./Controls";
import View from "./View";
import Stepper from "./Stepper";

const Deals = () => {
    const [activeStep, setActiveStep] = useState(0);

    const onNext = useCallback(() => setActiveStep((s) => s + 1), []);
    const onBack = useCallback(() => setActiveStep((s) => s - 1), []);

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 1 }}>
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
