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
import DescriptionSection from "../(sections)/Description";
import GoogleEarthSection from "../(sections)/GoogleEarthSection";

const MainContainer: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!); // basic details

    return data ? (
        <Grid container spacing={1}>
            <Grid item xs={12} lg={8} order={"row"}>
                <Grid container gap={1}>
                    <Grid item xs={12}>
                        <ImageSection />
                    </Grid>
                    <Grid item xs={12}>
                        <DetailsSection />
                    </Grid>
                    <Grid item xs={12}>
                        <ConstructionSection />
                    </Grid>
                    <Grid item xs={12}>
                        <TechnicalFeatures />
                    </Grid>
                    <Grid item xs={12}>
                        <Features />
                    </Grid>
                    <Grid item xs={12}>
                        <DescriptionSection />
                    </Grid>
                    <Grid item xs={12}>
                        <AddressSection />
                    </Grid>
                    <Grid item xs={12}>
                        <VideoSection />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={4} order="row">
                <Grid container gap={1}>
                    <Grid item xs={12}>
                        <BasicSection />
                    </Grid>
                    <Grid item xs={12}>
                        <HeatingSection />
                    </Grid>
                    <Grid item xs={12}>
                        <AreaSection />
                    </Grid>
                    <Grid item xs={12}>
                        <DistanceSection />
                    </Grid>
                    <Grid item xs={12}>
                        <SuitableFor />
                    </Grid>
                    <Grid item xs={12}>
                        <BalconiesSection />
                    </Grid>
                    <Grid item xs={12}>
                        <ParkingsSection />
                    </Grid>
                    <Grid item xs={12}>
                        <NotesSection />
                    </Grid>
                    <Grid item xs={12}>
                        <BlueprintsSection />
                    </Grid>
                    <Grid item xs={12}>
                        <GoogleEarthSection />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : null;
};
export default MainContainer;
