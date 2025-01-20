import {
    AddressSection,
    AreaSection,
    BalconiesSection,
    BlueprintsSection,
    DetailsSection,
    DistanceSection,
    HeatingSection,
    ImageSection,
    NotesSection,
    ParkingsSection,
    SuitableFor,
    TechnicalFeatures,
    VideoSection,
} from "../../(sections)";
import BasicSectionThreeCols from "./BasicSectionThreeCols";
import ConstructionSection from "../../(sections)/ConstructionSection";
import { useRouter } from "next/router";
import { useGetPropertyByIdQuery } from "src/services/properties";
import Features from "../../(sections)/FeaturesSection";
import DescriptionSection from "../../(sections)/DescriptionSection";
import Layout from "./Layout";

const QuickView = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data } = useGetPropertyByIdQuery(+propertyId!); // basic details

    if (!data) return null;

    return (
        <Layout initial="ImageSection">
            <ImageSection data={data} />
            <DetailsSection data={data} />
            <ConstructionSection data={data} />
            <TechnicalFeatures data={data} />
            <Features data={data} />
            <DescriptionSection />
            <AddressSection />
            <VideoSection data={data} />
            <BasicSectionThreeCols data={data} />
            <HeatingSection data={data} />
            <AreaSection data={data} />
            <DistanceSection data={data} />
            <SuitableFor data={data} />
            <BalconiesSection data={data} />
            <ParkingsSection data={data} />
            <NotesSection />
            <BlueprintsSection data={data} />
        </Layout>
    );
};

export default QuickView;
