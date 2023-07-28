import { Grid, Paper, PopperProps } from "@mui/material";
import { IPropertyResultResponse } from "src/types/properties";
import SearchNotFound from "src/components/search-not-found/SearchNotFound";
import { StyledPopper } from "../styles";
import { SearchItem } from "./SearchItem";

interface SearchListProps extends Omit<PopperProps, "direction" | "results"> {
	results: IPropertyResultResponse[];
	searchText: string;
}

export const SearchList = ({
	results,
	searchText,
	open,
	anchorEl,
}: SearchListProps) => {
	return (
		<StyledPopper open={open} anchorEl={anchorEl} placement="bottom-start">
			<Paper>
				{results?.length === 0 ? (
					<SearchNotFound query={searchText} />
				) : (
					<Grid container>
						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							lg={12}
							sx={{
								borderRight: { lg: "1px solid blue", md: 0 },
								marginY: "10px",
								overflow: "hidden",
							}}
						>
							{results.map((option, index: number) => (
								<SearchItem
									key={index}
									option={option}
									searchText={searchText}
								/>
							))}
						</Grid>
					</Grid>
				)}
			</Paper>
		</StyledPopper>
	);
};
