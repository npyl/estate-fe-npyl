import React from "react";

const wrapChild = (child: React.ReactElement) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (child.props.onClick) {
            child.props.onClick(event);
        }
    };

    return React.cloneElement(child, {
        onClick: handleClick,
    });
};

type PreventDefaultProps = {
    children: React.ReactNode;
};

const PreventDefault: React.FC<PreventDefaultProps> = ({ children }) => {
    const wrappedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return wrapChild(child);
        }

        return child;
    });

    return <>{wrappedChildren}</>;
};

export default PreventDefault;
