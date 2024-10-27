import { TODAY } from "@/components/BaseCalendar/constants";
import { Button } from "@mui/material";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    onClick: (d: Date) => void;
}

const TodayButton: FC<Props> = ({ onClick }) => {
    const { t } = useTranslation();
    const handleClick = useCallback(() => onClick(TODAY), []);
    return <Button onClick={handleClick}>{t("Today")}</Button>;
};

export default TodayButton;
