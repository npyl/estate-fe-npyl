import { ComponentType } from "react";
import { useWatch } from "react-hook-form";

type TComponent<P extends object = object> = ComponentType<P>;

const WithAll = <P extends object = object>(
    Component: TComponent<P>,
    isAllName: string
) => {
    const Wrapper = (props: P) => {
        const isAll = useWatch({ name: isAllName });
        if (isAll) return null;
        return <Component {...props} />;
    };

    Wrapper.displayName = "Wrapper";

    return Wrapper;
};

export default WithAll;
