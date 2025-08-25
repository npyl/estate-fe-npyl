import { useFiltersContext } from "@/sections/Customer/ViewAll/(FilterSection)/Context";

const PriceAndArea = () => {
    const { setMaxPrice, setMinPrice, setMinArea, setMaxArea, deleteFilter } =
        useFiltersContext();

    return (
        <>
            <button
                data-testid="set-min-price"
                onClick={() => setMinPrice(100000)}
            />
            <button
                data-testid="set-max-price"
                onClick={() => setMaxPrice(500000)}
            />
            <button
                data-testid="set-high-min-price"
                onClick={() => setMinPrice(600000)}
            />
            <button
                data-testid="clear-min-price"
                onClick={() => setMinPrice(undefined)}
            />
            <button
                data-testid="clear-max-price"
                onClick={() => setMaxPrice(undefined)}
            />
            <button data-testid="set-min-area" onClick={() => setMinArea(50)} />
            <button
                data-testid="set-max-area"
                onClick={() => setMaxArea(200)}
            />
            <button
                data-testid="set-high-min-area"
                onClick={() => setMinArea(250)}
            />
            <button
                data-testid="clear-min-area"
                onClick={() => setMinArea(undefined)}
            />
            <button
                data-testid="clear-max-area"
                onClick={() => setMaxArea(undefined)}
            />

            <button
                data-testid="delete-minPrice-filter"
                onClick={() => deleteFilter("minPrice")}
            />
            <button
                data-testid="delete-maxPrice-filter"
                onClick={() => deleteFilter("maxPrice")}
            />
        </>
    );
};

export default PriceAndArea;
