import { FC, ReactNode, isValidElement, cloneElement } from "react";

interface ItemProps {
    c: ReactNode;
    onRef: (el: HTMLDivElement) => void;
}

const Item: FC<ItemProps> = ({ c, onRef }) => {
    // If c is a valid React element, clone it and ensure all props are preserved
    // If it's not a React element (like a string or number), just render it as is
    if (isValidElement(c)) {
        return <div ref={onRef}>{cloneElement(c, { ...c.props })}</div>;
    }

    return <div ref={onRef}>{c}</div>;
};

export default Item;
