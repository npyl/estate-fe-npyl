export interface IFileResponse {
	key: string;
	url: string; // amazon to PUT image
	cdnUrl: string; // where image **WILL** be downloadable from when PUT finishes
}

export interface IPropertyImagePOST {
	id?: number;
	filename?: string;
	contentType?: string;
	hidden?: boolean;
	description?: string;
	title?: string;
	orderNumber?: number;
}

export interface IPropertyImage {
	id: number;
	hidden: boolean;
	description: string;
	title: string;
	orderNumber: number;
	url: string;
}

export interface IFileModel {
	filename: string;
	contentType: string;
	url: string;
}
