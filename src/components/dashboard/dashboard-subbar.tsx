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
  return (
    <Stack direction={"row"} spacing={2}>
      {tabs.map((tab, index) => (
        <Fragment key={index}>
          <Stack
            sx={{
              padding: "5px 10px",
              borderRadius: 2,
              boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px`,
            }}
            direction={"row"}
            alignItems={"center"}
          >
            <Button
              sx={{
                padding: 0,
                borderRadius: 0,
                "&:hover": {
                  background: "transparent",
                },
              }}
              variant='text'
              id={tab.title}
              onClick={() => router.push(tab.path)}
            >
              {tab.title}
            </Button>
            <IconButton
              sx={{
                padding: 0,
                marginLeft: 1,
                "&:hover": {
                  background: "transparent",
                },
              }}
              onClick={() => dispatch(deleteTab(tab.title))}
            >
              <ClearIcon />
            </IconButton>
          </Stack>
          {index !== tabs.length - 1 && (
            <Divider orientation='vertical' flexItem />
          )}
        </Fragment>
      ))}
    </Stack>
  );
};

export default Subbar;
