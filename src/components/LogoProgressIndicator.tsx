import type { FC } from "react";
import { Box } from "@mui/material";
import { Logo } from "./logo";
import { keyframes } from "@emotion/react";

const bounce1 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 1px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const bounce3 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 3px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

export const LogoProgressIndicator: FC = () => (
    <Box
        sx={{
            alignItems: "center",
            display: "flex",
            bottom: 35,
            left: 50,
            flexDirection: "column",
            justifyContent: "center",
            position: "fixed",
            zIndex: 2000,
        }}
    >
        <Logo
            sx={{
                height: 40,
                width: 40,
                "& path:nth-of-type(1)": {
                    animation: `${bounce1} 1s ease-in-out infinite`,
                },
                "& path:nth-of-type(3)": {
                    animation: `${bounce3} 1s ease-in-out infinite`,
                },
            }}
        />
    </Box>
);
