import {
  AppBar,
  AppBarProps,
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "src/hooks/use-auth";
import { Menu as MenuIcon } from "../../icons/menu";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import Image from "../image/Image";
import { AccountPopover } from "./account-popover";
import { DashboardNavbarSearch } from "./dashboard-navbar-search";
import { LanguagePopover } from "./language-popover";

type Language = "en" | "gr";

const languages: Record<Language, string> = {
  en: "/static/icons/uk_flag.svg",
  gr: "/static/icons/gr_flag.svg",
};

interface DashboardNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === "light"
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        boxShadow: "none",
      }),
}));

const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  // To get the user from the authContext, you can use
  const { user } = useAuth();
  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
          // alt={}
          src={""}
        >
          <UserCircleIcon fontSize='small' />
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

const LanguageButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { i18n } = useTranslation();
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenPopover} ref={anchorRef} sx={{ ml: 1 }}>
        <Box
          sx={{
            display: "flex",
            height: 20,
            width: 20,
            "& img": {
              width: "100%",
            },
            position: "relative",
          }}
        >
          <Image alt='' src={languages[i18n.language as Language]} />
        </Box>
      </IconButton>
      <LanguagePopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props;
  const [value, setValue] = useState<string>("");

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          width: {
            lg: "100%",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            height: 64,
            left: 0,
            px: 2,
            justifyContent: "space-between",
          }}
        >
          <Box
            p={3}
            sx={{
              display: {
                xs: "none",
                md: "inherit",
              },
            }}
          >
            <Link href='/'>
              <Typography color='neutral.900' variant={"h5"}>
                Mordor
              </Typography>
            </Link>
          </Box>
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: "inline-flex",
                md: "none",
              },
            }}
          >
            <MenuIcon fontSize='small' />
          </IconButton>
          <DashboardNavbarSearch />
          <Stack direction={"row"}>
            <LanguageButton />
            <AccountButton />
          </Stack>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
