import { useCallback, useState } from "react";
import Container from "@mui/material/Container";
import { Paper, SxProps, Theme } from "@mui/material";
import Form from "./Form";
import Controls from "./Controls";
import View from "./View";
import Stepper from "./Stepper";
import { FiltersProvider } from "@/sections/Properties/FiltersContext";

const PaperSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: 1,

    p: 1,
};

const FormSx: SxProps<Theme> = {
    display: "flex",
    gap: 1,
};

const Valuation = () => {
    const [activeStep, setActiveStep] = useState(0);

    const onNext = useCallback(() => setActiveStep((s) => s + 1), []);
    const onBack = useCallback(() => setActiveStep((s) => s - 1), []);

    return (
        <Container maxWidth="md">
            <Paper sx={PaperSx}>
                <Stepper activeStep={activeStep} />

                <FiltersProvider>
                    <Form sx={FormSx}>
                        <View idx={activeStep} />
                    </Form>
                </FiltersProvider>

                <Controls
                    activeStep={activeStep}
                    onBack={onBack}
                    onNext={onNext}
                />
            </Paper>
        </Container>
    );
};

export default Valuation;
