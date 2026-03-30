import React from "react";
import { styled } from "@mui/material/styles";

const CircleUnReadNotifications = styled("div")({
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "rgb(51, 102, 255)",
    color: "#fff",
    fontSize: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -8,
    top: 10,
    boxShadow: "0 0 0 2px white",
    fontWeight: "bold",
});

export default CircleUnReadNotifications;
