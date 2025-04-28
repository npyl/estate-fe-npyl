const getDiffedIds = (ids0: number[], ids1: number[]) =>
    ids1.filter((id) => !ids0.includes(id));

export default getDiffedIds;
