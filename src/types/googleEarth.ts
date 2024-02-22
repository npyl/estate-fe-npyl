export default interface IGoogleEarth {
    id: number;
    url: string;
    key: string;
    size: number;
    filename: string;
}

export interface IGoogleEarthPOST {
    id: number;
    key: string;
    contentType: string;
    size: number;
    filename: string;
}
