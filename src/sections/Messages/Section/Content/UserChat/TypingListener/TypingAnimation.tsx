import Box, { BoxProps } from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { keyframes, styled } from "@mui/material/styles";

const bounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
`;

interface DotProps extends BoxProps {
    delay?: number;
}

const Dot = styled(Box)<DotProps>(
    ({
        theme: {
            palette: { mode, neutral },
        },
        delay = 0,
    }) => ({
        width: 7,
        height: 7,
        backgroundColor: mode === "light" ? neutral?.[300] : neutral?.[700],
        borderRadius: "50%",
        margin: "0 2px",
        animation: `${bounce} 1s infinite ease-in-out`,
        animationDelay: `${delay}s`,
    })
);

const TypingAnimation = () => (
    <Stack direction="row" alignItems="center">
        <Dot />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
    </Stack>
);

export default TypingAnimation;
