interface IWorkForUs {
    attachments: string;
    positions: {
        advisor: true;
        external: true;
        informatics: true;
        marketing: true;
        photography: true;
        secretary: true;
    };
    workRegion: {
        areaID: number;
        latitude: number;
        longitude: number;
        level: number;
        nameEN: string;
        nameGR: string;
    };
}

export default IWorkForUs;
