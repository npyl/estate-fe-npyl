import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface HalfCircleProgressBarProps {
    value: number;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' | undefined;
    label?: string;
}

const HalfCircleProgressBar: React.FC<HalfCircleProgressBarProps> = ({ value, color, label }) => {
    return (
        <Box position="relative" display="inline-flex" alignItems="center">
            <CircularProgress
                variant="determinate"
                value={value}
                color={color}
                size={100}
                thickness={4}
                sx={{
                    position: 'absolute',
                    left: 0,
                    zIndex: 1,
                    borderRadius: '50%',
                    '& > svg': {
                        transform: 'rotate(-135deg)',
                    },
                }}
            />
            <CircularProgress
                variant="determinate"
                value={100}
                style={{ "color": "#d0d0d0" }}
                color="inherit"
                size={100}
                thickness={4}
                sx={{ borderRadius: '50%' }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: 2,
                    textAlign: 'center',
                    width: 0,
                    height: 0,
                    borderBottom: '90px solid white',
                    borderLeft: '40px solid transparent',
                    borderRight: '40px solid transparent',
                    bottom: '0',
                    left: 0,
                    right: 0,
                    margin: 'auto',
                }}
            ></Box>
            {label && (
                <Typography
                    variant="body2"
                    component="div"
                    sx={{
                        position: 'absolute',
                        zIndex: 2,
                        textAlign: 'center',
                        width: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                >
                    {label}
                </Typography>
            )}
        </Box>
    );
};

export default HalfCircleProgressBar;
