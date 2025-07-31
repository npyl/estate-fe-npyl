import { IMapAddress, IMapMarker } from "@/components/Map";

type TMarker = Required<IMapMarker>;

interface IClickRes {
    lat: number;
    lng: number;
    address: IMapAddress;
}

export type { TMarker, IClickRes };
