import { useAllUsersQuery } from "@/services/user";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFTextField } from "src/components/hook-form";

const ManagerSelect = () => {
    const { t } = useTranslation();
    const { data: managers } = useAllUsersQuery();

    return (
        <RHFTextField fullWidth select label={t("Manager")} name="managerId">
            <MenuItem value={""}>{t(`Not selected`)}</MenuItem>
            {managers?.map(({ firstName, lastName, id }, i) => (
                <MenuItem key={i} value={id}>
                    {`${firstName} ${lastName}`}
                </MenuItem>
            ))}
        </RHFTextField>
    );
};

export default ManagerSelect;
