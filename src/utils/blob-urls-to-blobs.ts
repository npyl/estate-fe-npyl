//
//  Takes a list of blob - urls(e.g.blob: http://912388312-31923912931-1239123) and converts it to list of Blobs
//

export async function convertBlobUrlsToBlobs(
    blobUrls: string[]
): Promise<Blob[]> {
    const blobPromises = blobUrls.map(async (blobUrl) => {
        const response = await fetch(blobUrl);
        const blobData = await response.blob();
        return blobData;
    });

    return Promise.all(blobPromises);
}
