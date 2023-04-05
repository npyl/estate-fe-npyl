import type { Theme } from "@mui/material";
import { Box, Button, Drawer, Link, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import type { FC } from "react";
import { useEffect } from "react";

interface MainSidebarProps {
  onClose?: () => void;
  open?: boolean;
}

const MainSidebarLink = styled(Link)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: "block",
  padding: theme.spacing(1.5),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const MainSidebar: FC<MainSidebarProps> = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const handlePathChange = () => {
    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  return (
    <Drawer
      anchor='right'
      onClose={onClose}
      open={!lgUp && open}
      PaperProps={{ sx: { width: 256 } }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 100,
      }}
      variant='temporary'
    >
      <Box sx={{ p: 2 }}>
        <Link href='/' passHref>
          <MainSidebarLink
            color='textSecondary'
            underline='none'
            variant='subtitle2'
          >
            Live Demo
          </MainSidebarLink>
        </Link>
        <Link href='/browse' passHref>
          <MainSidebarLink
            color='textSecondary'
            underline='none'
            variant='subtitle2'
          >
            Components
          </MainSidebarLink>
        </Link>
        <Link href='/docs/welcome' passHref>
          <MainSidebarLink
            color='textSecondary'
            underline='none'
            variant='subtitle2'
          >
            Documentation
          </MainSidebarLink>
        </Link>
        <Button
          component='a'
          fullWidth
          href='https://material-ui.com/store/items/devias-kit-pro'
          sx={{ mt: 1.5 }}
          target='_blank'
          variant='contained'
        >
          Buy Now
        </Button>
      </Box>
    </Drawer>
  );
};

MainSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
