import { Box, Stack, Typography } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import Image from "src/components/image/Image";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useRouter } from "next/router";
import { IProperties } from "src/types/properties";
import { StyledSearchStack } from "../styles";
import { useMemo } from "react";

interface SearchItemProps {
	searchText: string;
	option: IProperties;
}

export const SearchItem = ({ option, searchText }: SearchItemProps) => {
	const router = useRouter();

	const code = useMemo(
		() =>
			option.code
				? parse(option.code, match(option.code, searchText))[0]
				: {
						highlight: false,
						text: "",
				  },
		[option.code]
	);
	const keyCode = useMemo(
		() =>
			option.keyCode
				? parse(option.keyCode, match(option.keyCode, searchText))[0]
				: {
						highlight: false,
						text: "",
				  },
		[option.keyCode]
	);
	const price = useMemo(
		() =>
			option.price
				? parse(
						option.price.toString(),
						match(option.price.toString(), searchText)
				  )[0]
				: {
						highlight: false,
						text: "",
				  },
		[option.price]
	);
	const area = useMemo(
		() =>
			option.area
				? parse(
						option.area.toString(),
						match(option.area.toString(), searchText)
				  )[0]
				: {
						highlight: false,
						text: "",
				  },
		[option.area]
	);

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
						<Typography variant={"body2"}>Code:</Typography>
						<Box
							component="span"
							sx={{
								typography: "body2",
								fontWeight: code.highlight ? "bold" : "normal",
							}}
						>
							{code.text}
						</Box>
					</Stack>
					<Stack direction={"row"} alignItems={"center"} mr={1}>
						<Typography variant={"body2"}>Key:</Typography>
						<Box
							component="span"
							sx={{
								typography: "body2",
								fontWeight: keyCode.highlight ? "bold" : "normal",
							}}
						>
							{keyCode.text}
						</Box>
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
						<Box
							component="span"
							sx={{
								typography: "body2",
								fontWeight: price.highlight ? "bold" : "normal",
							}}
						>
							{price.text}
						</Box>
						<Typography variant={"body2"}>€</Typography>
					</Stack>
					<Stack direction={"row"} alignItems={"center"}>
						<Box
							component="span"
							sx={{
								typography: "body2",
								fontWeight: area.highlight ? "bold" : "normal",
							}}
						>
							{area.text}
						</Box>
						<Typography variant={"body2"}> s.q</Typography>
					</Stack>
				</Stack>
			</Stack>
		</StyledSearchStack>
	);
};
