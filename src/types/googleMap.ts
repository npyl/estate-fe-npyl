export interface Place {
    business_status: string;
    geometry: Geometry;
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: OpeningHours;
    photos?: PhotosEntity[] | null;
    place_id: string;
    plus_code: PlusCode;
    rating: number;
    reference: string;
    scope: string;
    types?: string[] | null;
    user_ratings_total: number;
    vicinity: string;
    html_attributions?: null[] | null;
}
export interface Geometry {
    location: Location;
    viewport: Viewport;
}
export interface Location {
    lat: number;
    lng: number;
}
export interface Viewport {
    south: number;
    west: number;
    north: number;
    east: number;
}
export interface OpeningHours {
    open_now: boolean;
}
export interface PhotosEntity {
    height: number;
    html_attributions?: string[] | null;
    width: number;
}
export interface PlusCode {
    compound_code: string;
    global_code: string;
}
