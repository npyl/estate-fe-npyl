import Slider from "@mui/material/Slider";

const ColorBar = ({ position, onChange }: any) => (
    <Slider
        value={position}
        onChange={onChange}
        min={0}
        max={100}
        track={false}
        slotProps={{
            rail: {
                style: {
                    background:
                        "linear-gradient(to right, #0073ff, #00ff00, #ffff00, #ffae00, #ff0000, #7d0000)",
                    height: "10px",
                },
            },
            thumb: {
                style: {
                    backgroundColor: "white",
                    border: "1px solid #aaa",
                },
            },
        }}
        sx={{
            width: "100%",
            marginTop: "20px",
        }}
    />
);

export default ColorBar;
