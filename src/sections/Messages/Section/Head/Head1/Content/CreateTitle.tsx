import AssigneeAutocomplete from "@/sections/_Autocompletes/Assignee";
import { useTranslation } from "react-i18next";
import { useCreateConversationContext } from "../../../CreateConversation";
import { useCallback } from "react";
import { IUserMini } from "@/types/user";
import { useAuth } from "@/hooks/use-auth";

const CreateTitle = () => {
    const { t } = useTranslation();

    const { recipients, setRecipients } = useCreateConversationContext();

    // INFO: Disable current user
    const { user } = useAuth();
    const getOptionDisabled = useCallback(
        ({ id }: IUserMini) => id === user?.id,
        [user?.id]
    );

    return (
        <AssigneeAutocomplete
            label={t("User")}
            error={false}
            value={recipients?.[0]}
            onChange={(v) => setRecipients([v])}
            getOptionDisabled={getOptionDisabled}
            sx={{
                width: "300px",
            }}
        />
    );
};

export default CreateTitle;
