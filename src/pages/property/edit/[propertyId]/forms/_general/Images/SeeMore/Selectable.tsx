interface SelectableItemProps extends ItemProps {
    selectMultiple: boolean;
    compare: boolean;
    selected: boolean;
}

export const SelectableItem = ({
    selectMultiple,
    compare,
    selected,
    image,
    index,
    onClick,
}: SelectableItemProps) => {
    const checked = useMemo(
        () => (compare || selectMultiple) && selected,
        [selectMultiple, selected, compare]
    );

    return (
        <div style={{ position: "relative" }}>
            {checked && (
                <Check
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
            <Item image={image} index={index} onClick={onClick} />
        </div>
    );
};
