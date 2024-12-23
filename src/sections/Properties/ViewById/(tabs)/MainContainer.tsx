import { Grid } from "@mui/material";
import {
    AddressSection,
    AreaSection,
    BalconiesSection,
    BasicSection,
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
} from "../(sections)";
import ConstructionSection from "../(sections)/ConstructionSection";
import { useRouter } from "next/router";
import { useGetPropertyByIdQuery } from "src/services/properties";
import Features from "../(sections)/FeaturesSection";
import DescriptionSection from "../(sections)/DescriptionSection";

const MainContainer: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!); // basic details

    return data ? (
        <Grid container spacing={1}>
            <Grid item xs={12} lg={8} order={"row"}>
                <Grid container gap={1}>
                    <Grid item xs={12}>
                        <ImageSection data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <DetailsSection data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <ConstructionSection data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <TechnicalFeatures data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <Features data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <DescriptionSection />
                    </Grid>
                    <Grid item xs={12}>
                        <AddressSection />
                    </Grid>
                    <Grid item xs={12}>
                        <VideoSection data={data} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={4} order={"row"}>
                <Grid container gap={1}>
                    <Grid item xs={12}>
                        <BasicSection data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <HeatingSection data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <AreaSection data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <DistanceSection data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <SuitableFor data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <BalconiesSection data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <ParkingsSection data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <NotesSection />
                    </Grid>
                    <Grid item xs={12}>
                        <BlueprintsSection data={data} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : null;
};
export default MainContainer;
