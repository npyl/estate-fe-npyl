type PromiseFunction<T> = () => Promise<T>;

async function executeSequentially<T>(
    promises: PromiseFunction<T>[]
): Promise<T[]> {
    const results: T[] = [];

    for (const promise of promises) {
        const result = await promise();
        results.push(result);
    }

    return results;
}

export default executeSequentially;
