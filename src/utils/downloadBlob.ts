const downloadBlob = (blob: Blob, title: string) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default downloadBlob;
