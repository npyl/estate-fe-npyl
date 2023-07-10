import { Box, Grid, Paper, Stack } from "@mui/material";

interface MainContainerProps {
  ImageSection: JSX.Element;
  BasicSection: JSX.Element;
  DetailsSection: JSX.Element;
  HeatingSection: JSX.Element;
  AreaSection: JSX.Element;
  DistanceSection: JSX.Element;
  ParkingsSection: JSX.Element;
  BalconiesSection: JSX.Element;
  BlueprintsSection: JSX.Element;
  NotesSection: JSX.Element;
  VideoSection: JSX.Element;
  SuitableFor: JSX.Element;
  TechnicalFeatures: JSX.Element;
}

const MainContainer: React.FC<MainContainerProps> = (props) => {
  const {
    ImageSection,
    BasicSection,
    DetailsSection,
    HeatingSection,
    AreaSection,
    DistanceSection,
    ParkingsSection,
    BalconiesSection,
    BlueprintsSection,
    NotesSection,
    VideoSection,
    SuitableFor,
    TechnicalFeatures,
  } = props;

  return (
    <Grid container spacing={1}>
      <Grid item xs={8} order={"row"}>
        <Stack spacing={1}>
          <Grid item xs={12}>
            {ImageSection}
          </Grid>
          <Grid item xs={12}>
            {DetailsSection}
          </Grid>
          <Grid item xs={12}>
            {TechnicalFeatures}
          </Grid>
          <Grid item xs={12}>
            {BlueprintsSection}
          </Grid>

          <Grid item xs={12}>
            {VideoSection}
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={4} order={"row"}>
        <Stack spacing={1}>
          <Grid item xs={12}>
            {BasicSection}
          </Grid>
          <Grid item xs={12}>
            {HeatingSection}
          </Grid>
          <Grid item xs={12}>
            {AreaSection}
          </Grid>
          <Grid item xs={12}>
            {DistanceSection}
          </Grid>
          <Grid item xs={12}>
            {SuitableFor}
          </Grid>
          <Grid item xs={12}>
            {BalconiesSection}
          </Grid>
          <Grid item xs={12}>
            {ParkingsSection}
          </Grid>
          <Grid item xs={12}>
            {NotesSection}
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};
export default MainContainer;
