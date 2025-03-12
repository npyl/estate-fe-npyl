import { IColor } from "./types";

const TEXT_COLORS: IColor[] = [
    {
        key: "default",
        label: "Default",
        color: "inherit",
    },
    {
        key: "gray",
        label: "Gray",
        color: "rgb(155, 155, 155)",
    },
    {
        key: "brown",
        label: "Brown",
        color: "rgb(186, 133, 111)",
    },
    {
        key: "orange",
        label: "Orange",
        color: "rgb(199, 125, 72)",
    },
    {
        key: "yellow",
        label: "Yellow",
        color: "rgb(202, 152, 77)",
    },
    {
        key: "green",
        label: "Green",
        color: "rgb(82, 158, 114)",
    },
    {
        key: "blue",
        label: "Blue",
        color: "rgb(55, 154, 211)",
    },
    {
        key: "purple",
        label: "Purple",
        color: "rgb(157, 104, 211)",
    },
    {
        key: "pink",
        label: "Pink",
        color: "rgb(209, 87, 150)",
    },
    {
        key: "red",
        label: "Red",
        color: "rgb(223, 84, 82)",
    },
];

const BACKGROUND_COLORS = [
    {
        key: "default",
        label: "Default",
        color: "transparent",
    },
    {
        key: "lightGray",
        label: "Light Gray",
        color: "rgb(240, 240, 239)", // Solid gray
    },
    {
        key: "lightPink",
        label: "Light Pink",
        color: "rgb(244, 228, 228)", // Solid pink
    },
    {
        key: "lightOrange",
        label: "Light Orange",
        color: "rgb(249, 231, 210)", // Solid orange
    },
    {
        key: "lightYellow",
        label: "Light Yellow",
        color: "rgb(250, 239, 206)", // Solid yellow
    },
    {
        key: "lightGreen",
        label: "Light Green",
        color: "rgb(229, 242, 226)", // Solid green
    },
    {
        key: "lightBlue",
        label: "Light Blue",
        color: "rgb(219, 240, 249)", // Solid blue
    },
    {
        key: "lightPurple",
        label: "Light Purple",
        color: "rgb(241, 234, 250)", // Solid purple
    },
    {
        key: "lightMagenta",
        label: "Light Magenta",
        color: "rgb(251, 230, 241)", // Solid magenta
    },
    {
        key: "lightRed",
        label: "Light Red",
        color: "rgb(252, 226, 228)", // Solid red
    },
];

export { TEXT_COLORS, BACKGROUND_COLORS };
