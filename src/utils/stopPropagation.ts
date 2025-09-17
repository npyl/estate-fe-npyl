const stopPropagation = (e: any) => {
    if (!("stopPropagation" in e)) return;
    e.stopPropagation();
};

export default stopPropagation;
