//
//  Takes a list of blob-urls (e.g. blob:http://912388312-31923912931-1239123) and converts it to list of Files 
//

export async function convertBlobUrlsToFiles(blobUrls: string[]): Promise<File[]> {
    function getFileNameFromUrl(blobUrl: string): string {
        // Replace this with your own logic to extract the file name from the blob URL
        // For example, you can use string manipulation or URL parsing methods
        return blobUrl.split('/').pop() || 'unknown_filename';
    }

    const filePromises = blobUrls.map(async (blobUrl) => {
        const response = await fetch(blobUrl);
        const blobData = await response.blob();
        const fileName = getFileNameFromUrl(blobUrl); // Replace with your own logic to extract the file name

        return new File([blobData], fileName);
    });

    return Promise.all(filePromises);
}