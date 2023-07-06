import ClearIcon from "@mui/icons-material/Clear";
import { Button, Divider, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { deleteTab, selectTabs } from "src/slices/tabs";
import { useDispatch } from "src/store";

const Subbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const tabs = useSelector(selectTabs);
  const currentPath = router.asPath;
  return (
    <Stack direction={"row"} spacing={2}>
      {tabs.map((tab, index) => (
        <Fragment key={index}>
          <Stack
            sx={{
              bgcolor: currentPath === tab.path ? "primary.main" : "unset",
              padding: "0px 8px",
              borderRadius: 2,
              boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px`,
            }}
            direction={"row"}
            alignItems={"center"}
          >
            <Button
              sx={{
                minWidth: "90px",
                padding: 0,
                borderRadius: 0,
                color: currentPath === tab.path ? "white" : "unset",
                "&:hover": {
                  background: "transparent",
                },
              }}
              variant="text"
              id={tab.title}
              onClick={() => router.push(tab.path)}
            >
              {tab.title}
            </Button>
            <IconButton
              sx={{
                padding: 0,
                marginLeft: 1,
                color: currentPath === tab.path ? "white" : "unset",
                "&:hover": {
                  background: "transparent",
                },
              }}
              onClick={() => dispatch(deleteTab(tab.uuid))}
            >
              <ClearIcon sx={{ fontSize: 13 }} />
            </IconButton>
          </Stack>
          {index !== tabs.length - 1 && (
            <Divider orientation="vertical" flexItem />
          )}
        </Fragment>
      ))}
    </Stack>
  );
};

export default Subbar;
