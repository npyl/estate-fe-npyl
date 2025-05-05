import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FC } from "react";
import VIEWS from "./Views";
import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";

interface ControlsProps {
    activeStep: number;
    onBack: VoidFunction;
    onNext: VoidFunction;
}

const Controls: FC<ControlsProps> = ({ activeStep, onBack, onNext }) => {
    const { t } = useTranslation();

    const isFirst = activeStep === 0;
    const isLast = activeStep === VIEWS.length - 1;
    const isOverLast = activeStep > VIEWS.length - 1;

    const nextLabel = isLast ? "Finish" : "Next";

    return (
        <Stack direction="row" spacing={1}>
            {!isFirst ? (
                <Button
                    color="inherit"
                    onClick={onBack}
                    sx={{
                        mr: 1,
                    }}
                >
                    {t("Back")}
                </Button>
            ) : null}
            <Box sx={{ flex: "1 1 auto" }} />
            {!isOverLast ? (
                <Button onClick={onNext}>{t(nextLabel)}</Button>
            ) : null}
        </Stack>
    );
};

export default Controls;
