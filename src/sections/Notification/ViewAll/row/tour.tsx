import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";

interface TourRowProps {
    row: ContactNotification;
    filter: any;
}

const TourRow = ({ row, filter }: TourRowProps) => {
    return <BasicRow row={row} filter={filter} />;
};

export default TourRow;
