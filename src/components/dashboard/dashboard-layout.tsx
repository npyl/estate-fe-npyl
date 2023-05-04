import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Divider, MenuItem, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import type { FC, ReactNode } from "react";
import { useState } from "react";
import StyledMenu from "../StyledMenu";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import Subbar from "./dashboard-subbar";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("md")]: {
    paddingLeft: 200,
  },
}));

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            marginBottom: 0,
            backgroundColor: "neutral.100",
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Paper sx={{ margin: 3, padding: 2, marginBottom: 0 }}>
            <Stack
              alignItems={"center"}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Subbar />
              <Button
                id='create-menu-button'
                aria-controls={open ? "create-menu" : undefined}
                aria-haspopup='true'
                aria-expanded={open ? "true" : undefined}
                variant='contained'
                disableElevation
                onClick={handleClick}
              >
                <AddIcon />
                Create
              </Button>

              <StyledMenu
                id='create-menu'
                MenuListProps={{
                  "aria-labelledby": "create-menu-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    router.push("/property/create");
                  }}
                  disableRipple
                >
                  <HomeIcon />
                  Property
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    router.push("/user/create");
                  }}
                  disableRipple
                >
                  Manager
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem
                  onClick={() => {
                    router.push("/customer/create");
                  }}
                  disableRipple
                >
                  Owner
                </MenuItem>
              </StyledMenu>
            </Stack>
          </Paper>
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onOpenSidebar={(): void => setIsSidebarOpen(true)} />
      <DashboardSidebar
        onClose={(): void => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
