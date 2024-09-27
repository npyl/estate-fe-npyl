import { GridRow, GridRowProps } from "@mui/x-data-grid";
import Link from "@/components/Link";

interface CustomRowProps extends GridRowProps {
    resource: string;
}

const CustomRow = ({ resource, ...props }: CustomRowProps) => (
    <Link href={`/${resource}/${props.row?.id}`}>
        <GridRow {...props} />
    </Link>
);

export default CustomRow;
