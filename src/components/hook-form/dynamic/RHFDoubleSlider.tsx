import { ComponentType, forwardRef } from "react";
import RHFDoubleSlider from "../RHFDoubleSlider";

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
                minName={minName}
                maxName={maxName}
                key={`${minName}_${maxName}`}
            />
        )
    );

    Forwarded.displayName = "RHFWithDynamicMinMaxName";

    return Forwarded;
}

export default WithDynamicMinMaxName(RHFDoubleSlider);
