import { RoleReq } from "@/types/roles";
import isFalsy from "@/utils/isFalsy";
import Typography from "@mui/material/Typography";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Title = () => {
    const { t } = useTranslation();
    const id = useWatch<RoleReq>({ name: "id" });
    const label = isFalsy(id) ? "CreateRole" : "EditRole";
    return (
        <Typography variant="h5" align="center">
            {t(label)}
        </Typography>
    );
};

export default Title;
