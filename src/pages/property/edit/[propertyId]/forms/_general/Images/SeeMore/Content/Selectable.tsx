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
    selectMultiple: boolean;
    compare: boolean;
    selected: boolean;
}

const SelectableItem = ({
    selectMultiple,
    compare,
    selected,
    ...props
}: SelectableItemProps) => {
    const checked = (compare || selectMultiple) && selected;

    return (
        <div style={{ position: "relative" }}>
            {checked ? <StyledCheckIcon /> : null}
            <ImageItem {...props} />
        </div>
    );
};

export default SelectableItem;
