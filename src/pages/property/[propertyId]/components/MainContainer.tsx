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
  } = props;

  return (
    <>
      <Stack direction={{ md: "row", xs: "column" }} p={2} spacing={2}>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "70%", sm: "100%" },
          }}
        >
          {ImageSection}
        </Box>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "30%", sm: "100%" },
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
            width: { md: "25%", sm: "100%" },
          }}
        >
          {ParkingsSection}
        </Box>

        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { md: "25%", sm: "100%" },
          }}
        >
          {BalconiesSection}
        </Box>
      </Stack>

      <Stack direction={{ md: "row", xs: "column" }} p={2}>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            width: { sm: "100%" },
          }}
        >
          {BlueprintsSection}
        </Box>
      </Stack>
    </>
  );
};
export default MainContainer;
