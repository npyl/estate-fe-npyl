import { PublicSvg } from "@/assets/PublicSvg";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LabeledSwitch } from "./Switch";
import Item from "./styled";

interface PublicItemProps {
    label: string;
    published: boolean;
    onClick: () => void;
}

const PublicItem = ({ label, published, onClick }: PublicItemProps) => (
    <Item>
        <Stack direction="row" spacing={0.8} alignItems="center">
            <PublicSvg />
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
