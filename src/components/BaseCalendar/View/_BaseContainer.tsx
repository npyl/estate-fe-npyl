import Numbering from "@/components/Calendar/Views/Numbering";
import { CSSProperties, FC, HTMLAttributes } from "react";

const defaultStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    position: "relative",
};

interface BaseContainerProps extends HTMLAttributes<HTMLDivElement> {}

const BaseContainer: FC<BaseContainerProps> = ({
    children,
    style,
    ...props
}) => (
    <div style={{ ...defaultStyle, ...style }} {...props}>
        <Numbering />
        {children}
    </div>
);

export default BaseContainer;
