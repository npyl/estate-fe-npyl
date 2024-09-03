import {
    useLazyGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
} from "@/services/location";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

const useClosest = () => {
    const { setValue } = useFormContext();

    const [getHierarchy] = useLazyGetHierarchyByAreaIdQuery();
    const [getClosestQuery] = useLazyGetClosestQuery();

    const getClosest = useCallback(async (lat: number, lng: number) => {
        const { data: closest, error } = await getClosestQuery({
            latitude: lat,
            longitude: lng,
        });

        if (!closest) {
            console.error("Error getting closest: ", error);
            return;
        }

        // update slice
        if (closest.level === 2) {
            setValue("location.region", closest.parentID.toString());
            setValue("location.city", closest.areaID.toString());
        } else if (closest.level === 3) {
            const neighbId = closest.areaID;
            const municipId = closest.parentID;

            setValue("location.complex", neighbId.toString());
            setValue("location.city", municipId.toString());

            // For region
            getHierarchy(municipId)
                .unwrap()
                .then((municipHierarchy) => {
                    const regionId = municipHierarchy.parentID;
                    if (!regionId) return;

                    setValue("location.region", regionId.toString());
                })
                .catch((reason) => console.log("getHierarchy: ", reason));
        }
    }, []);

    return { getClosest };
};

export default useClosest;
