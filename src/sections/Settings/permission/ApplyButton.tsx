import { useSaveRelationshipMutation } from "@/services/security";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";
import { useSecurityContext } from "./Context";
import Button from "@mui/material/Button";

const ApplyButton = () => {
    const { t } = useTranslation();

    const [saveRelationship, { isLoading }] = useSaveRelationshipMutation();

    const { data, targetUser, selectedUser, isFetching } = useSecurityContext();

    return (
        <Button
            variant="contained"
            endIcon={<SendIcon />}
            disabled={
                selectedUser === -1 ||
                targetUser === -1 ||
                isFetching ||
                isLoading
            }
            onClick={() => saveRelationship(data)}
        >
            {t("Apply Changes")}
        </Button>
    );
};

export default ApplyButton;
