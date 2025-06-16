import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LabeledSwitch } from "../Switch";
import Item from "../styled";
import { useTranslation } from "react-i18next";
import PublicLogo from "@/assets/logo/Public";

interface PublicItemProps {
    label: string;
    published: boolean;
    onClick: () => void;
}

const PublicItem = ({ label, published, onClick }: PublicItemProps) => {
    const { t } = useTranslation();
    return (
        <Item>
            <Stack direction="row" spacing={1.5} alignItems="center">
                <PublicLogo width={20} height={20} />
                <Typography sx={{ position: "relative", left: -7 }}>
                    {label}
                </Typography>
            </Stack>
            <LabeledSwitch
                checked={published}
                labelOn={t("Published")}
                labelOff={t("Unpublished")}
                onChange={onClick}
                name="checkedA"
            />
        </Item>
    );
};

export default PublicItem;
