const CustomActiveDot = (props: any) => {
    const { cx, cy } = props;

    if (cx == null || cy == null) return null;

    return (
        <circle
            cx={cx}
            cy={cy}
            r={3}
            fill={"none"}
            stroke={"none"}
            strokeWidth={1}
        />
    );
};

export default CustomActiveDot;
