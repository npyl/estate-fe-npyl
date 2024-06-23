import { Button, ButtonGroup as MuiButtonGroup } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Stack from "@mui/material/Stack";
import FormHelperText from "@mui/material/FormHelperText";
import { useTranslation } from "react-i18next";

const ButtonGroup = () => {
    const { t } = useTranslation();
    const { control, watch, setValue } = useFormContext();

    const v1 = watch("variant") === "basic" ? "contained" : "outlined";
    const v2 = watch("variant") === "purchase" ? "contained" : "outlined";

    const setBasic = () => setValue("variant", "basic");
    const setPurchase = () => setValue("variant", "purchase");

    return (
        <Controller
            name="variant"
            control={control}
            render={({ fieldState: { error } }) => (
                <Stack spacing={1}>
                    <MuiButtonGroup>
                        <Button name="variant" variant={v1} onClick={setBasic}>
                            {t("Basic")}
                        </Button>
                        <Button
                            name="variant"
                            variant={v2}
                            onClick={setPurchase}
                        >
                            {t("Purchase")}
                        </Button>
                    </MuiButtonGroup>

                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </Stack>
            )}
        />
    );
};

export default ButtonGroup;
