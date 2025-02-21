import { useGetAgreementByIdQuery } from "@/services/agreements";
import { useRouter } from "next/router";
import Skeleton from "./Skeleton";
import Description from "./Description";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

const ViewById = () => {
    const router = useRouter();
    const { agreementId } = router.query;

    const { data: agreement, isLoading } = useGetAgreementByIdQuery(
        +agreementId!
    );

    if (isLoading || !agreement) return <Skeleton />;

    return (
        <>
            <Description a={agreement} />
            <Box mb={1} />
            <PDFViewer a={agreement} />
        </>
    );
};

export default ViewById;
