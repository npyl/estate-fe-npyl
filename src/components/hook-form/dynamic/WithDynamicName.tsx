import React, { ComponentType, forwardRef, ForwardedRef } from "react";

/**
 * Support a dynamic `name`
 * Without the key prop we cannot force a re-render properly
 * (see: https://github.com/orgs/react-hook-form/discussions/10858)
 * @param name A Controller's name (for react-hook-form elements)
 */
const dynamicName = (name: string) => ({
    name,
    key: name,
});

interface PropsWithName {
    name: string;
}

function WithDynamicName<T extends PropsWithName>(
    WrappedComponent: ComponentType<T>
) {
    const Forwarded = forwardRef<any, T>(({ name, ...props }, ref) => (
        <WrappedComponent
            ref={ref}
            {...(props as unknown as T)}
            {...dynamicName(name)}
        />
    ));

    Forwarded.displayName = "RHFWithDynamicName";

    return Forwarded;
}

export default WithDynamicName;
