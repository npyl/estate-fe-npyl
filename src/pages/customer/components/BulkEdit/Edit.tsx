import { Autocomplete, InputLabel, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAllUsersQuery } from "src/services/user";
import {
    StyledButton,
    StyledTextField,
} from "src/pages/components/BulkEditDrawer/style";
import { Close } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";

interface EditProps<T> {
    data: T;
    setData: (data: T) => void;
}

interface DefaultOrEditProps {
    label: string;
    children: React.ReactNode;
    onDisable: () => void;
}

export const DefaultOrEdit = ({
    label,
    children,
    onDisable,
}: DefaultOrEditProps) => {
    const [checked, setChecked] = useState(true);

    useMemo(() => checked && onDisable(), [checked]);

    return (
        <Stack>
            <InputLabel>{label}</InputLabel>
            <StyledButton
                variant="outlined"
                endIcon={
                    checked ? (
                        <CheckIcon color="success" />
                    ) : (
                        <Close color="error" />
                    )
                }
                onClick={() => setChecked(!checked)}
            >
                Default Value
            </StyledButton>
            {!checked && children}
        </Stack>
    );
};

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

export const EditLabels = ({ data, setData }: EditProps<number[]>) => {
    return <div>EditLabels Component</div>;
};
