import KeyIcon from "@mui/icons-material/Key";
import { Box, Stack, Typography } from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useRouter } from "next/router";
import { IProperties } from "src/types/properties";
import Image from "src/components/image/Image";
import { StyledSearchStack } from "../styles";

interface SearchItemProps {
	searchText: string;
	option: IProperties;
	partsPath: Array<{ text: string; highlight: boolean }>;
}

export const SearchItem = ({
	option,
	partsPath,
	searchText,
}: SearchItemProps) => {
	const router = useRouter();

	return (
		<StyledSearchStack
			justifyContent={"flex-start"}
			paddingY={1}
			paddingX={2}
			spacing={1}
			direction={"row"}
			alignItems={"center"}
			onClick={() => router.push(`/property/${option.id}`)}
		>
			<Image
				padding={0}
				height={20}
				width={20}
				src={option.propertyImage.url}
			/>
			<Stack direction={"column"}>
				<Stack spacing={1} direction={"row"}>
					<Stack alignItems={"center"} direction={"row"}>
						<Typography variant={"body2"}>Id:</Typography>
						{partsPath.map((part, index) => (
							<Box
								key={index}
								component="span"
								sx={{
									typography: "body2",
									fontWeight: part.highlight ? "bold" : "normal",
								}}
							>
								{part.text}
							</Box>
						))}
					</Stack>
					<Stack direction={"row"} alignItems={"center"} mr={1}>
						{option.keyCode &&
							parse(option.keyCode, match(option.keyCode, searchText)).map(
								(part, index) => (
									<Box
										key={index}
										component="span"
										sx={{
											typography: "body2",
											fontWeight: part.highlight ? "bold" : "normal",
										}}
									>
										{part.text}
									</Box>
								)
							)}
						<Box>
							<KeyIcon
								sx={{
									marginTop: "5px",
									fontSize: "16px",
									transform: "rotate(90deg)",
								}}
							/>
						</Box>
					</Stack>
				</Stack>
				<Stack alignItems={"center"} direction={"row"}>
					<Stack direction={"row"} alignItems={"center"} mr={1}>
						{parse(
							option.price.toString(),
							match(option.price.toString(), searchText)
						).map((part, index) => (
							<Box
								key={index}
								component="span"
								sx={{
									typography: "body2",
									fontWeight: part.highlight ? "bold" : "normal",
								}}
							>
								{part.text}
							</Box>
						))}
						<Typography variant={"body2"}>€</Typography>
					</Stack>
					<Stack direction={"row"} alignItems={"center"}>
						{parse(
							option.area.toString(),
							match(option.area.toString(), searchText)
						).map((part, index) => (
							<Box
								key={index}
								component="span"
								sx={{
									typography: "body2",
									fontWeight: part.highlight ? "bold" : "normal",
								}}
							>
								{part.text}
							</Box>
						))}
						<Typography variant={"body2"}> s.q</Typography>
					</Stack>
				</Stack>
			</Stack>
		</StyledSearchStack>
	);
};
