import { Send as SendIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { useFormContext, useWatch } from "react-hook-form";
import { ICreatePropertyParams } from "@/services/properties";

const SAVE_BUTTON_TESTID = "PPPropertyCreateSaveButton";

const SaveButton = () => {
    const { t } = useTranslation();

    const { formState } = useFormContext<ICreatePropertyParams>();
    const { isLoading } = formState || {};

    const category = useWatch<ICreatePropertyParams>({ name: "category" });

    return (
        <LoadingButton
            data-testid={SAVE_BUTTON_TESTID}
            type="submit"
            loading={isLoading}
            variant="contained"
            startIcon={<SendIcon />}
            disabled={category === "" || isLoading}
        >
            {t("Save")}
        </LoadingButton>
    );
};

export { SAVE_BUTTON_TESTID };
export default SaveButton;
