// ------------------- Priority ---------------------

import { alpha, Theme } from "@mui/material/styles";

const getTaskBgcolor =
    (p: number) =>
    ({ palette: { warning, info, error } }: Theme) =>
        alpha(p === 0 ? info.main : p === 1 ? warning.main : error.main, 0.1);

const getTaskColor =
    (p: number) =>
    ({ palette: { warning, info, error } }: Theme) =>
        p === 0 ? info.main : p === 1 ? warning.main : error.main;

// --------------------------------------------------

export { getTaskColor, getTaskBgcolor };
