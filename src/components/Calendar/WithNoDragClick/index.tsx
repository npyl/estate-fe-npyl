import { ComponentType, forwardRef, MouseEvent } from "react";
import useNoDragClick from "./useNoDragClick";

type MouseHandlers<T = Element> = {
    onClick?: (e: MouseEvent<T>) => void;
    onMouseDown?: (e: MouseEvent<T>) => void;
    onMouseMove?: (e: MouseEvent<T>) => void;
};

const WithNoDragClick = <P extends MouseHandlers<any>>(
    Cell: ComponentType<P>
) => {
    const WrappedComponent = forwardRef<any, P>(
        ({ onClick, onMouseDown, onMouseMove, ...props }, ref) => {
            const methods = useNoDragClick(onClick, onMouseDown, onMouseMove);
            return <Cell ref={ref} {...methods} {...(props as unknown as P)} />;
        }
    );

    WrappedComponent.displayName = `WithNoDragClick(View)`;

    return WrappedComponent;
};

export default WithNoDragClick;
