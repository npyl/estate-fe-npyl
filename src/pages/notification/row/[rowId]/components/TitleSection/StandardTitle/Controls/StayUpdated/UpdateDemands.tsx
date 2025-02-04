import { HideText } from "@/components/styled";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";

const UpdateDemandsButton = () => {
    const { t } = useTranslation();

    return (
        <LoadingButton
            // loading={isLoading}
            // disabled={isLoading}
            sx={{
                textWrap: "nowrap",
                ...HideText,
            }}
            color="info"
            variant="contained"
            startIcon={<PersonIcon />}
            // onClick={handleCreate}
        >
            {t("Update Customer")}
        </LoadingButton>
    );
};

export default UpdateDemandsButton;
