import CheckIcon from "@mui/icons-material/Check";
import Item, { ItemProps } from "./Item";

interface SelectableItemProps extends ItemProps {
    selectMultiple: boolean;
    compare: boolean;
    selected: boolean;
}

const SelectableItem = ({
    selectMultiple,
    compare,
    selected,
    image,
    onClick,
}: SelectableItemProps) => {
    const checked = (compare || selectMultiple) && selected;

    return (
        <div style={{ position: "relative" }}>
            {checked && (
                <CheckIcon
                    sx={{
                        position: "absolute",
                        top: 1,
                        right: 1,
                        zIndex: 1,
                        fontSize: 35,
                        color: "yellow",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                    }}
                />
            )}
            <Item image={image} onClick={onClick} />
        </div>
    );
};

export default SelectableItem;
