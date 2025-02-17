import { PublicSvg } from "@/assets/integrations/PublicSvg";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LabeledSwitch } from "./Switch";
import Item from "./styled";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PublicItemProps {
    label: string;
    published: boolean;
    onClick: () => void;
}
const publicLogo = "/static/PublicLogo.png";

const PublicItem = ({ label, published, onClick }: PublicItemProps) => {
    const { t } = useTranslation();
    return (
        <Item>
            <Stack direction="row" spacing={1.5} alignItems="center">
                <IconButton size="small">
                    <img
                        src={publicLogo}
                        alt="Public Logo"
                        style={{ width: "20px", height: "20px" }}
                    />
                </IconButton>
                <Typography sx={{ position: "relative", left: -7 }}>
                    {label}
                </Typography>

                <LabeledSwitch
                    checked={published}
                    labelOn="Published"
                    labelOff={t("Unpublished")}
                    onChange={onClick}
                    name="checkedA"
                />
            </Stack>
        </Item>
    );
};

export default PublicItem;
