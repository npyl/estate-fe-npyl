import { Autocomplete } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAllUsersQuery } from "src/services/user";
import { StyledTextField } from "src/pages/components/BulkEditDrawer/style";
import { EditProps } from "src/pages/components/BulkEdit/types";
import { DefaultOrEdit } from "src/pages/components/BulkEdit/DefaultOrEdit";

export const EditManager = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    interface Fullnames {
        [key: string]: string;
    }

    const usersData = useAllUsersQuery().data || [];

    const fullnames: Fullnames = useMemo(
        () =>
            usersData
                ?.filter((manager) => manager.firstName && manager.lastName) // filter nulls
                .reduce((acc, manager) => {
                    const fullname = `${manager.firstName} ${manager.lastName}`;
                    return { ...acc, [fullname]: `${manager.id}` };
                }, {}),
        [usersData]
    );

    const autocompleteChange = (_event: any, value: string | null) => {
        if (value === null) return;
        setData(fullnameToId(value) || "");
    };

    const fullnameToId = (fullname: string) => fullnames[fullname];
    const idToFullname = (id: string) =>
        Object.keys(fullnames).find((key) => fullnames[key] === id) || "";

    return (
        <DefaultOrEdit label={t("Manager")} onDisable={() => setData("")}>
            <Autocomplete
                disablePortal
                value={idToFullname(data) || ""}
                onChange={autocompleteChange}
                options={Object.keys(fullnames)}
                renderInput={(params) => <StyledTextField {...params} />}
            />
        </DefaultOrEdit>
    );
};
