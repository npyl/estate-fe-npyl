import { Box, Stack } from "@mui/material";

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
    <Box>
      <Stack direction={{ md: "row", xs: "column" }} spacing={2}>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "60%", sm: "100%" },
          }}
        >
          {ImageSection}
        </Box>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "40%", sm: "100%" },
          }}
        >
          {BasicSection}
        </Box>
      </Stack>
      <Stack spacing={2} direction={{ md: "row", xs: "column" }} p={2}>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "25%", sm: "100%" },
          }}
        >
          {DetailsSection}
        </Box>

        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "25%", sm: "100%" },
          }}
        >
          {HeatingSection}
        </Box>

        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "25%", sm: "100%" },
          }}
        >
          {AreaSection}
        </Box>

        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "25%", sm: "100%" },
          }}
        >
          {DistanceSection}
        </Box>
      </Stack>
      <Stack direction={{ md: "row", xs: "column" }} p={2}>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { sm: "50%", xs: "100%" },
          }}
        >
          {BlueprintsSection}
        </Box>

        {ParkingsSection}
        {BalconiesSection}
      </Stack>

      <Stack spacing={2} direction={{ md: "row", xs: "column" }} p={2}>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "40%", sm: "100%" },
          }}
        >
          {NotesSection}
        </Box>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "25%", sm: "100%" },
          }}
        >
          {SuitableFor}
        </Box>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "35%", sm: "100%" },
          }}
        >
          {TechnicalFeatures}
        </Box>
      </Stack>

      {VideoSection}
    </Box>
  );
};
export default MainContainer;
