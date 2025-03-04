import { useRouter } from "next/router";
import { useGetPropertyByIdQuery } from "src/services/properties";
import Layout from "./Layout";

const QuickView = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data } = useGetPropertyByIdQuery(+propertyId!); // basic details

    if (!data) return null;

    return <Layout initial="ImageSection" />;
};

export default QuickView;
