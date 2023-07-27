import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { deleteSectionData, deleteTab, selectTabs } from "src/slices/tabs";
import { useDispatch } from "src/store";

const Subbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const tabs = useSelector(selectTabs);
  const currentPath = router.asPath;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleDeleteTab = (tabUuid: string, tabIndex: number) => {
    // Dispatch the delete actions
    dispatch(deleteTab(tabUuid));
    dispatch(deleteSectionData(tabUuid));

    // Calculate the new tab to move to
    let newTab;
    if (tabs.length > 1) {
      newTab =
        tabIndex === tabs.length - 1 ? tabs[tabIndex - 1] : tabs[tabIndex + 1];
    } else {
      // Fallback route if there are no more tabs
      newTab = { path: "/" };
    }

    // Redirect to the new tab
    router.push(newTab.path);
  };
  return (
    <Stack direction={isSmallScreen ? "column" : "row"} spacing={1}>
      {tabs.map((tab, index) => (
        <Fragment key={index}>
          <Box
            sx={{
              borderBottom: 3,
              borderBottomColor:
                currentPath === tab.path ? "primary.main" : "transparent",
              transition: "0.8s",
              "&:hover": {
                borderBottomColor: "primary.main",
                cursor: "pointer",
                transform: "scale(1.05)", // Scales up when hovered
              },
            }}
          >
            <Button
              sx={{
                color: currentPath === tab.path ? "primary.main" : "#555",
                "&:hover": {
                  background: "transparent",
                },
              }}
              variant="text"
              id={tab.title}
              onClick={() => router.push(tab.path)}
            >
              <Typography
                variant="subtitle2" // smaller size
                sx={{
                  fontWeight: "300", // thinner weight
                  textTransform: "capitalize",
                }}
              >
                {tab.title}
              </Typography>
              {currentPath === tab.path && (
                <>
                  <Typography> __ </Typography>
                  <Tooltip title="Delete tab" aria-label="delete ">
                    <IconButton
                      sx={{
                        color:
                          currentPath === tab.path ? "primary.main" : "unset",
                        "&:hover": {
                          background: "transparent",
                        },
                        marginLeft: 0,
                        padding: 0,
                      }}
                      onClick={() => handleDeleteTab(tab.uuid, index)}
                    >
                      <ClearIcon sx={{ fontSize: isSmallScreen ? 8 : 10 }} />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Button>
          </Box>
          {!isSmallScreen && index !== tabs.length - 1 && (
            <Divider orientation="vertical" flexItem />
          )}
        </Fragment>
      ))}
    </Stack>
  );
};

export default Subbar;
