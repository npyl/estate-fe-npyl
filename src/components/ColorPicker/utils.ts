const getColorFromPosition = (position: number): string => {
    const hue = (position / 100) * 360;
    // Convert HSL to Hex
    const h = hue / 360;
    const s = 1;
    const l = 0.5;

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const hueToRgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    const r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
    const g = Math.round(hueToRgb(p, q, h) * 255);
    const b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);

    return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

const getPositionFromColor = (hexColor: string): number => {
    // Remove # if present
    const hex = hexColor.replace("#", "");

    // Parse RGB values
    const r = Number.parseInt(hex.substring(0, 2), 16) / 255;
    const g = Number.parseInt(hex.substring(2, 4), 16) / 255;
    const b = Number.parseInt(hex.substring(4, 6), 16) / 255;

    // Find min and max RGB values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let hue = 0;

    // Calculate hue
    if (delta === 0) {
        hue = 0;
    } else if (max === r) {
        hue = 60 * (((g - b) / delta) % 6);
    } else if (max === g) {
        hue = 60 * ((b - r) / delta + 2);
    } else {
        hue = 60 * ((r - g) / delta + 4);
    }

    // Normalize hue to 0-360
    if (hue < 0) {
        hue += 360;
    }

    // Convert hue to position (0-100)
    return (hue / 360) * 100;
};

export { getColorFromPosition, getPositionFromColor };
