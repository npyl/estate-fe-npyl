type TPreset = {
    offline: boolean;
    latency: number;
    downloadThroughput: number;
    uploadThroughput: number;
    connectionType?: any;
};

const NETWORK_PRESETS: Record<string, TPreset> = {
    Reset: {
        offline: false,
        downloadThroughput: -1,
        uploadThroughput: -1,
        latency: 0,
    },

    // ----------------------------------------------

    Offline: {
        offline: true,
        downloadThroughput: 0,
        uploadThroughput: 0,
        latency: 0,
        connectionType: "none",
    },

    Regular2G: {
        offline: false,
        downloadThroughput: (250 * 1024) / 8,
        uploadThroughput: (50 * 1024) / 8,
        latency: 300,
        connectionType: "cellular2g",
    },
    Good2G: {
        offline: false,
        downloadThroughput: (450 * 1024) / 8,
        uploadThroughput: (150 * 1024) / 8,
        latency: 150,
        connectionType: "cellular2g",
    },
    Regular3G: {
        offline: false,
        downloadThroughput: (750 * 1024) / 8,
        uploadThroughput: (250 * 1024) / 8,
        latency: 100,
        connectionType: "cellular3g",
    },
    Good3G: {
        offline: false,
        downloadThroughput: (1.5 * 1024 * 1024) / 8,
        uploadThroughput: (750 * 1024) / 8,
        latency: 40,
        connectionType: "cellular3g",
    },
    Regular4G: {
        offline: false,
        downloadThroughput: (4 * 1024 * 1024) / 8,
        uploadThroughput: (3 * 1024 * 1024) / 8,
        latency: 20,
        connectionType: "cellular4g",
    },
    WiFi: {
        offline: false,
        downloadThroughput: (30 * 1024 * 1024) / 8,
        uploadThroughput: (15 * 1024 * 1024) / 8,
        latency: 2,
        connectionType: "wifi",
    },
};

export type { TPreset };
export default NETWORK_PRESETS;
