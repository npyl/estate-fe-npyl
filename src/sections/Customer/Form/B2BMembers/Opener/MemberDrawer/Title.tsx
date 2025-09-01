import { B2BMemberReq } from "@/types/customer";
import isFalsy from "@/utils/isFalsy";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface TitleProps {
    member?: B2BMemberReq;
}

const Title: FC<TitleProps> = ({ member }) => {
    const { t } = useTranslation();

    const { firstName, lastName } = member || {};
    const fullname = `${firstName || ""} ${lastName || ""}`;

    const title = isFalsy(member) ? t("Add Member") : fullname;

    return (
        <Typography px={0.5} variant="h6">
            {" "}
            {title}
        </Typography>
    );
};

export default Title;
