import { useCallback, useEffect, useState } from "react";
import useResponsive from "@/hooks/useResponsive";

const useResponsiveOrientation = (): [boolean, VoidFunction] => {
    const belowLg = useResponsive("down", "lg");

    const [orientation, setOrientation] = useState(false);
    const toggleOrientation = useCallback(
        () => setOrientation((old) => !old),
        []
    );

    // Revert to vertical orientation on mobile
    useEffect(() => {
        if (belowLg) setOrientation(false);
    }, []);

    return [orientation, toggleOrientation];
};

export default useResponsiveOrientation;
