import { ComponentType, forwardRef } from "react";

const dynamicMinMaxName = (minName: string, maxName: string) => ({
    minName,
    maxName,
    key: `${minName}_${maxName}`,
});

interface PropsWithMinMaxName {
    minName: string;
    maxName: string;
}

function WithDynamicMinMaxName<T extends PropsWithMinMaxName>(
    WrappedComponent: ComponentType<T>
) {
    const Forwarded = forwardRef<any, T>(
        ({ minName, maxName, ...props }, ref) => (
            <WrappedComponent
                ref={ref}
                {...(props as unknown as T)}
                {...dynamicMinMaxName(minName, maxName)}
            />
        )
    );

    Forwarded.displayName = "RHFWithDynamicMinMaxName";

    return Forwarded;
}

export default WithDynamicMinMaxName;
