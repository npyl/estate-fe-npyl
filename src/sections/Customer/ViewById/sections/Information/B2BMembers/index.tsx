import ViewPanel from "@/components/Panel/View";
import useGetCustomer from "@/sections/Customer/hooks/useGetCustomer";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import getMember from "./getMember";

const B2BMembers = () => {
    const { t } = useTranslation();
    const { customer } = useGetCustomer();
    const { members } = customer || {};
    return (
        <ViewPanel label={t("Members")}>
            <Stack maxHeight="500px" overflow="hidden auto">
                {members?.map(getMember)}
            </Stack>
        </ViewPanel>
    );
};

export default B2BMembers;
