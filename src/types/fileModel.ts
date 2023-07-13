export interface IFileResponse
{
  key: string;
  url: string;        // amazon to PUT image
  cdnUrl: string;     // where image **WILL** be downloadable from when PUT finishes
}

export interface IFileModel {
  filename: string;
  contentType: string;
  url: string;
}
