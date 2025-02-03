import { HideText } from "@/components/styled";
import Button from "@mui/material/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";

interface Props {}

const CreateCustomerButton: FC<Props> = () => {
    const { t } = useTranslation();

    return (
        <Button
            sx={{
                textWrap: "nowrap",
                ...HideText,
            }}
            color="info"
            variant="contained"
            startIcon={<PersonIcon />}
            // onClick={openModal}
        >
            {t("Create Customer")}
        </Button>
    );
};

// -------------------------------------------------------------------

const StayUpdatedButtons = () => <CreateCustomerButton />;
export default StayUpdatedButtons;
