import {
    useFilterNotificationsQuery,
    useGetNotificationByIdQuery,
} from "@/services/notification";
import { IDemandFilters } from "@/types/demand";
import { INotificationFilter } from "@/types/notification/notification";
import { NextPage } from "next";
import { FC } from "react";

// INFO: prevent from showing up on production
export const getStaticProps = async () => {
    if (process.env.NODE_ENV === "production") {
        return { notFound: true };
    }
    return { props: {} };
};

// ----------------------------------------------------------------------------

const VIEW_BY_ID_TEST_ID = "view-by-id-test-id";
const FILTERS_TEST_ID = "filters-test-id";
const SHAPELIST_TEST_ID = "shapelist-test-id";

/**
 * Removes all properties that have null values or empty arrays from an object
 * @param obj - The object to clean
 * @return A new object with null values and empty arrays removed
 */
function cleanObject(obj: Record<string, any>) {
    // Create a new object to avoid mutating the original
    const result: Record<string, any> = {};

    // Loop through all properties of the object
    for (const key in obj) {
        const value = obj[key];

        // Skip null values
        if (value === null) continue;

        // Skip empty arrays
        if (Array.isArray(value) && value.length === 0) continue;

        // Handle nested objects recursively
        if (typeof value === "object" && !Array.isArray(value)) {
            const cleanedNestedObj = cleanObject(value);

            // Only add the nested object if it has properties after cleaning
            if (Object.keys(cleanedNestedObj).length > 0) {
                result[key] = cleanedNestedObj;
            }
        } else {
            // Add valid values to the result
            result[key] = value;
        }
    }

    return result;
}

/**
 * Transforms an object to INotificationFilter format
 * (Reduces key-value pair objects in arrays to just their keys)
 * @param obj - The object to transform
 * @return A new object with key-value pairs simplified
 */
const toINotificationFilter = (obj: Record<string, any>) => {
    // Create a new object to store the result
    const result: Record<string, any> = {};

    // Loop through all properties of the object
    for (const key in obj) {
        const value = obj[key];

        // Handle arrays that might contain key-value pair objects
        if (Array.isArray(value)) {
            // Check if array contains objects with 'key' property
            if (
                value.length > 0 &&
                typeof value[0] === "object" &&
                value[0] !== null &&
                "key" in value[0]
            ) {
                // Extract just the keys from each object in the array
                result[key] = value.map((item) => item.key);
            } else {
                // Keep the array as is if it doesn't contain key-value objects
                result[key] = value;
            }
        } else if (typeof value === "object" && value !== null) {
            // Handle nested objects recursively
            if ("key" in value && "value" in value) {
                // If it's a key-value pair object, just keep the key
                result[key] = value.key;
            } else {
                // Otherwise recursively process the nested object
                result[key] = toINotificationFilter(value);
            }
        } else {
            // For primitive values, keep them as they are
            result[key] = value;
        }
    }

    return result;
};

const getTestFriendlyFilters = (f?: IDemandFilters) => {
    if (!f) return "";
    const clean = cleanObject(f);
    const PUBLICNotificationFilter = toINotificationFilter(clean);
    return JSON.stringify(PUBLICNotificationFilter);
};

/**
 * Our backend requires null on y of second x,y pair (that describes radius)
 * *BUT* gives us back 0 where null used to be.
 * Re-convert to null so that our test has a 1-1 comparison
 */
const getFrontendFriendlyShape = (shapeList?: any[]) => {
    if (!shapeList) return "";
    if (!Array.isArray(shapeList)) return "";
    if (shapeList.length === 0) return "";
    if (Array.isArray(shapeList[0]) && shapeList[0].length === 0) return "";

    // Create a deep copy of the shape
    const shapeCopy = JSON.parse(JSON.stringify(shapeList[0]));

    // Modify the copy instead of the original
    shapeCopy[1].y = null;

    return JSON.stringify(shapeCopy);
};

interface ViewByIdProps {
    id: number;
}

const ViewById: FC<ViewByIdProps> = ({ id }) => {
    const { data } = useGetNotificationByIdQuery(id);
    const { stayUpdatedDetails } = data || {};
    const { customerDemand } = stayUpdatedDetails || {};
    const { filters, shapeList } = customerDemand || {};

    const v0 = getTestFriendlyFilters(filters);
    const v1 = getFrontendFriendlyShape(shapeList);

    return (
        <div data-testid={VIEW_BY_ID_TEST_ID}>
            <div data-testid={FILTERS_TEST_ID}>{v0}</div>
            <div data-testid={SHAPELIST_TEST_ID}>{v1}</div>
        </div>
    );
};

// ----------------------------------------------------------------------------

const sortBy = "updatedAt";
const direction = "DESC";
const page = 0;
const pageSize = 10;

const DEFAULT_FILTERS: INotificationFilter = {
    fromDate: null,
    toDate: null,
    search: "",
    types: ["STAY_UPDATED"],
    viewed: undefined,
};

const useLatestNotificationId = () => {
    const { data } = useFilterNotificationsQuery({
        filter: DEFAULT_FILTERS,
        page,
        pageSize,
        sortBy,
        direction,
    });

    const { content } = data || {};

    const topId =
        Array.isArray(content) && content.length > 0
            ? (content.at(0)?.id ?? -1)
            : -1;

    return topId;
};

const StayUpdated: NextPage = () => {
    const topId = useLatestNotificationId();

    if (topId === -1) return null;

    return <ViewById id={topId} />;
};

// ----------------------------------------------------------------------------

export { VIEW_BY_ID_TEST_ID, FILTERS_TEST_ID, SHAPELIST_TEST_ID };
export default StayUpdated;
