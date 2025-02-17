import { useGetPDFGeneratedAtQuery } from "@/services/properties";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import GenerateButton from "./GenerateButton";
const NotGeneratedPlaceholder = dynamic(
    () => import("./NotGeneratedPlaceholder")
);
const DownloadButton = dynamic(() => import("./DownloadButton"));
const GeneratedAt = dynamic(() => import("./GeneratedAt"));

const Content = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data } = useGetPDFGeneratedAtQuery(+propertyId!);

    const hasPDF = Boolean(data);

    return (
        <Stack spacing={3} p={1}>
            {!hasPDF ? <NotGeneratedPlaceholder /> : null}
            {hasPDF ? <GeneratedAt generatedAt={data!} /> : null}

            <Stack direction="row" justifyContent="center" spacing={1}>
                <GenerateButton />
                {hasPDF ? <DownloadButton /> : null}
            </Stack>
        </Stack>
    );
};

export default Content;
