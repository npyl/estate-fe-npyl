import AssigneeAutocomplete from "@/sections/_Autocompletes/Assignee";
import { useTranslation } from "react-i18next";
import { useCreateConversationContext } from "../../../CreateConversation";

const CreateTitle = () => {
    const { t } = useTranslation();

    const { recipients, setRecipients } = useCreateConversationContext();

    return (
        <AssigneeAutocomplete
            label={t("User")}
            error={false}
            value={recipients?.[0]}
            onChange={(v) => setRecipients([v])}
            sx={{
                width: "300px",
            }}
        />
    );
};

export default CreateTitle;
