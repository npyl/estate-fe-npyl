import { useGetPublicSitesQuery } from "@/services/company";
import Stack from "@mui/material/Stack";
import getPublicSite from "./getPublicSite";

const List = () => {
    const { data } = useGetPublicSitesQuery();
    return (
        <Stack spacing={1} p={1} px={2}>
            {data?.map(getPublicSite)}
        </Stack>
    );
};

export default List;
