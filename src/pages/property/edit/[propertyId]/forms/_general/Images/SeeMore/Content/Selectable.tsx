import CheckIcon from "@mui/icons-material/Check";
import ImageItem from "../../_shared/ImageItem";
import { ImageItemProps } from "../../_shared/types";
import { styled } from "@mui/material/styles";

const StyledCheckIcon = styled(CheckIcon)(({ theme }) => ({
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
    fontSize: "35px",
    color: "yellow",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
}));

interface SelectableItemProps extends ImageItemProps {
    id: number; // INFO: necessary for TwoDimentionsDnd
    selected: boolean;
}

const SelectableItem = ({ selected, ...props }: SelectableItemProps) => (
    <div style={{ position: "relative" }}>
        {selected ? <StyledCheckIcon /> : null}
        <ImageItem {...props} />
    </div>
);

export default SelectableItem;
