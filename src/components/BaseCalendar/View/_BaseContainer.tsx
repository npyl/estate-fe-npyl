import { CSSProperties, FC } from "react";
import { BaseContainerProps } from "../types";

const defaultStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    position: "relative",
};

const BaseContainer: FC<BaseContainerProps> = ({
    children,
    style,
    Numbering,
    ...props
}) => (
    <div style={{ ...defaultStyle, ...style }} {...props}>
        <Numbering />
        {children}
    </div>
);

export default BaseContainer;
