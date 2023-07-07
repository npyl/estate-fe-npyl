import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
//
import { StyledLabel } from './styles';
import { LabelProps } from './types';

import { Close as CloseIcon } from "@mui/icons-material";

// ----------------------------------------------------------------------

const Label = forwardRef<HTMLSpanElement, LabelProps>(
  ({ children, color = 'default', variant = 'soft', onClose, sx, ...other }, ref) => {
    const theme = useTheme();

    const iconStyle = {
      minWidth: 16,
      minHeight: 16,
      '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
    };
    const radius = 10;

    return (
      <StyledLabel
        ref={ref}
        component="span"
        ownerState={{ color, variant }}
        sx={{
          pl: 0.75,
          ...(onClose && { pr: 0.75 }),
          m: 0.13,
          borderRadius: radius,
        }}
        theme={theme}
        {...other}
      >
        <Box sx={{ mr: 0.75, ...sx, borderRadius: radius, ...iconStyle }}></Box>

        {children}

        {onClose &&
          <Box>
            <IconButton
              aria-label="close"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>}
      </StyledLabel>
    );
  }
);

export default Label;
