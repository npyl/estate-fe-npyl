import { PublicSvg } from "@/assets/PublicSvg";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LabeledSwitch } from "./Switch";
import Item from "./styled";
import { IconButton } from "@mui/material";

interface PublicItemProps {
    label: string;
    published: boolean;
    onClick: () => void;
}
const publicLogo = "/static/PublicLogo.png";

const PublicItem = ({ label, published, onClick }: PublicItemProps) => (
    <Item>
        <Stack direction="row" spacing={0.8} alignItems="center">
            <IconButton size="small">
                <img
                    src={publicLogo}
                    alt="Public Logo"
                    style={{ width: "20px", height: "20px" }}
                />
            </IconButton>
            <Typography>{label}</Typography>
        </Stack>

        <LabeledSwitch
            checked={published}
            labelOn="Published"
            labelOff="Unpublished"
            onChange={onClick}
            name="checkedA"
        />
    </Item>
);

export default PublicItem;
