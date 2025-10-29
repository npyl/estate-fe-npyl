import { FormGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import IOSSwitch from "@/components/iOSSwitch";
import { useToggleActiveUserMutation } from "@/services/user";
import stopPropagation from "@/utils/stopPropagation";

const getIsChecked = (activeStatuses: boolean[], userId: number) => {
    try {
        return activeStatuses[userId] ?? false;
    } catch (ex) {
        return false;
    }
};

interface ToggleActiveButtonProps {
    activeStatuses: boolean[];
    userId: number;
}

const ToggleActiveButton: FC<ToggleActiveButtonProps> = ({
    activeStatuses,
    userId,
}) => {
    const { t } = useTranslation();

    const isChecked = getIsChecked(activeStatuses, userId);

    const [toggleActiveUser] = useToggleActiveUserMutation();

    const toggle = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation();
            toggleActiveUser(userId);
        },
        [userId]
    );

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <IOSSwitch
                        checked={isChecked} // fallback to 'false' if the id is not yet in the state
                        onChange={toggle}
                        onClick={stopPropagation}
                        sx={{ m: 1 }}
                    />
                }
                label={t("Active")}
            />
        </FormGroup>
    );
};

export default ToggleActiveButton;
