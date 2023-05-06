export interface Cities {
  type: string;
  totalFeatures: number;
  features: Feature[];
  crs: CRS;
}

export interface CRS {
  type: string;
  properties: CRSProperties;
}

export interface CRSProperties {
  name: string;
}

export interface Feature {
  type: string;
  id: string;
  geometry: Geometry;
  geometry_name: string;
  properties: FeatureProperties;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface FeatureProperties {
  ONOMA: string;
  NAME: string;
}
