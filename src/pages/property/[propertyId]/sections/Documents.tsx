import {
    Paper,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useGetPropertyByIdQuery } from "src/services/properties";

const Documents: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const documents = useMemo(() => property?.documents || [], [property]);

    return (
        <Grid container direction={"row"} columns={5} gap={3} flex={1}>
            {documents?.map(({ key, filename, url }) =>
                url ? (
                    <Card key={key}>
                        <CardHeader>{filename}</CardHeader>
                        <CardContent>
                            <iframe src={url} />
                        </CardContent>
                    </Card>
                ) : null
            )}
        </Grid>
    );
};

export default Documents;
