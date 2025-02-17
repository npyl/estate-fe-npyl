import { useRouter } from "next/router";
import { FC, useEffect } from "react";

interface Props {
    propertyId: number;
}

const SuccessWatcher: FC<Props> = ({ propertyId }) => {
    const router = useRouter();

    useEffect(() => {
        router.push(`/property/${propertyId}`);
    }, [router, propertyId]);

    return null;
};

export default SuccessWatcher;
