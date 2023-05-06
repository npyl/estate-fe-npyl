import KeyIcon from "@mui/icons-material/Key";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useGetSearchResultsQuery } from "src/services/properties";
import { IProperties } from "src/types/properties";
import { useDebouncedCallback } from "use-debounce";
import Image from "../image/Image";
import SearchNotFound from "../search-not-found/SearchNotFound";
import { SearchInput, StyledPopper, StyledSearchStack } from "./styles";
type SearchCategory = "all" | "property" | "customers" | "labels";
export const DashboardNavbarSearch: FC = () => {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [searchCategory, setSearchCategory] = useState<SearchCategory>("all");
  const { data: results, isLoading } = useGetSearchResultsQuery(debouncedText, {
    skip: debouncedText === "",
  });
  const handleSearch = useDebouncedCallback((value) => {
    setDebouncedText(value);
  }, 50);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleInputChange = (event: any) => {
    console.log(event.currentTarget);
    setSearchText(event.target.value);
    setAnchorEl(event.currentTarget);
    handleSearch(event.target.value);
  };

  const handleClear = () => {
    setSearchText("");
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <SearchInput
        onBlur={() => setAnchorEl(null)}
        value={searchText}
        onChange={handleInputChange}
        placeholder='Search with a keyword'
        endAdornment={
          <InputAdornment
            sx={{ display: { xs: "none", md: "flex" } }}
            position='end'
          >
            <IconButton
              sx={{
                borderRight: "1px solid",
                borderColor: "divider",
                borderRadius: 0,
              }}
              color={"primary"}
              disableFocusRipple
              disableRipple
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>

            <Select
              sx={{
                width: "150px",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: 0,
                },
              }}
              value={searchCategory}
              onChange={(event) =>
                setSearchCategory(event.target.value as SearchCategory)
              }
            >
              <MenuItem value='all'>Categories</MenuItem>
              <MenuItem value='property'>Properties</MenuItem>
              <MenuItem value='customers'>Customers</MenuItem>
              <MenuItem value='labels'>Label Keys</MenuItem>
            </Select>
          </InputAdornment>
        }
      />

      <StyledPopper open={open} anchorEl={anchorEl} placement='bottom-start'>
        <Paper>
          {(!results || results?.length === 0) && (
            <SearchNotFound query={searchText} />
          )}
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={4}
              sx={{
                borderRight: { lg: "1px solid blue", md: 0 },
                marginY: "10px",
                overflow: "hidden",
              }}
            >
              {results &&
                results.length > 0 &&
                results.map((option: IProperties, index: number) => {
                  const partsPath = parse(
                    option.code.toString(),
                    match(option.code.toString(), searchText)
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
                        src={`data:image/jpeg;base64,${option.propertyImage}`}
                      />
                      <Stack direction={"column"}>
                        <Stack spacing={1} direction={"row"}>
                          <Stack alignItems={"center"} direction={"row"}>
                            <Typography variant={"body2"}>Id:</Typography>
                            {partsPath.map((part, index) => (
                              <Box
                                key={index}
                                component='span'
                                sx={{
                                  typography: "body2",
                                  fontWeight: part.highlight
                                    ? "bold"
                                    : "normal",
                                }}
                              >
                                {part.text}
                              </Box>
                            ))}
                          </Stack>
                          <Stack direction={"row"} alignItems={"center"} mr={1}>
                            {parse(
                              option.keyId,
                              match(option.keyId, searchText)
                            ).map((part, index) => (
                              <Box
                                key={index}
                                component='span'
                                sx={{
                                  typography: "body2",
                                  fontWeight: part.highlight
                                    ? "bold"
                                    : "normal",
                                }}
                              >
                                {part.text}
                              </Box>
                            ))}
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
                                component='span'
                                sx={{
                                  typography: "body2",
                                  fontWeight: part.highlight
                                    ? "bold"
                                    : "normal",
                                }}
                              >
                                {part.text}
                              </Box>
                            ))}
                            <Typography variant={"body2"}>€</Typography>
                          </Stack>
                          <Stack direction={"row"} alignItems={"center"}>
                            {parse(
                              option.totalArea.toString(),
                              match(option.totalArea.toString(), searchText)
                            ).map((part, index) => (
                              <Box
                                key={index}
                                component='span'
                                sx={{
                                  typography: "body2",
                                  fontWeight: part.highlight
                                    ? "bold"
                                    : "normal",
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
                })}
            </Grid>
          </Grid>
          {/* {isLoading && <CircularProgress />}
          {results && results.length === 0 && (
            <SearchNotFound query={searchText} />
          )} */}
          {/* const partsPath = parse(
           `property/${id}`,
           match(`property/${id}`, inputValue)
         );
         if (isLoading) {
           return <CircularProgress value={5} />;
         }
       */}
          {/* {results &&
            results.length > 0 &&
            results.map((option) => {
              return (
                <Grid
                  container
                  key={option.id}
                  padding={1}
                  onClick={(event) => {
                    router.push(`/property/${id}`);
                  }}
                >
                  <Grid item xs={3}>
                    <Divider />
                    <Box component={"li"}>
                      <Image
                        width={32}
                        height={32}
                        src={`data:image/jpeg;base64,${option.propertyImage}`}
                        ratio='16/9'
                      />
                      {parse(
                        `property/${option.id}`,
                        match(`property/${option.id}`, searchText)
                      ).map((part, index) => (
                        <Box
                          key={index}
                          component='span'
                          sx={{
                            typography: "caption",
                            color: part.highlight
                              ? "primary.main"
                              : "text.secondary",
                          }}
                        >
                          {part.text}
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              );
            })} */}
        </Paper>
      </StyledPopper>
    </div>
  );

  // <Box>
  //   <Autocomplete
  //     open={open}
  //     onBlur={() => setOpen(false)}
  //     filterOptions={(option) => {
  //       // if (option.length === 0) {
  //       //   setOpen(false);
  //       // }
  //       return option;
  //     }}
  //     autoHighlight
  //     disablePortal
  //     disableClearable
  //     popupIcon={null}
  //     PopperComponent={StyledPopper}
  //     onInputChange={(event, value) => {
  //       setOpen(true);
  //       setSearchText(value);
  //       handleSearch(value);
  //     }}
  //     onChange={() => setOpen(false)}
  //     options={results || []}
  //     // groupBy={(option) => option}
  //     getOptionLabel={(option) =>
  //       typeof option === "string" ? option : option.id.toString()
  //     }
  //     isOptionEqualToValue={(option, value) => {
  //       console.log(option, value);
  //       return option.id === value.id;
  //     }}
  //     renderInput={(params) => (
  //       <SearchInput
  //         {...params.InputProps}
  //         inputProps={params.inputProps}
  //         value={searchText}
  //         placeholder='Search with a keyword'
  //         endAdornment={
  //           <InputAdornment
  //             sx={{ display: { xs: "none", md: "flex" } }}
  //             position='end'
  //           >
  //             <IconButton
  //               sx={{
  //                 borderRight: "1px solid",
  //                 borderColor: "divider",
  //                 borderRadius: 0,
  //               }}
  //               color={"primary"}
  //               disableFocusRipple
  //               disableRipple
  //               onClick={handleSearch}
  //             >
  //               <SearchIcon />
  //             </IconButton>

  //             <Select
  //               sx={{
  //                 width: "150px",
  //                 ".MuiOutlinedInput-notchedOutline": { border: 0 },
  //                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
  //                   border: 0,
  //                 },
  //               }}
  //               value={searchCategory}
  //               onChange={(event) =>
  //                 setSearchCategory(event.target.value as SearchCategory)
  //               }
  //             >
  //               <MenuItem value='all'>Categories</MenuItem>
  //               <MenuItem value='property'>Properties</MenuItem>
  //               <MenuItem value='customers'>Customers</MenuItem>
  //               <MenuItem value='labels'>Label Keys</MenuItem>
  //             </Select>
  //           </InputAdornment>
  //         }
  //       />
  //     )}
  //     renderOption={(props, option, { inputValue }) => {
  //       console.log(option, props);
  //       const { id } = option;
  //       const partsPath = parse(
  //         `property/${id}`,
  //         match(`property/${id}`, inputValue)
  //       );
  //       if (isLoading) {
  //         return <CircularProgress value={5} />;
  //       }
  //       return (
  //         <Grid
  //           container
  //           key={option.id}
  //           padding={1}
  //           onClick={(event) => {
  //             console.log(event);
  //             setOpen(false);
  //             router.push(`/property/${id}`);
  //           }}
  //         >
  //           <Grid item xs={3}>
  //             <Divider />
  //             <Box component={"li"} {...props}>
  //               <Image
  //                 width={32}
  //                 height={32}
  //                 src={`data:image/jpeg;base64,${option.propertyImage}`}
  //                 ratio='16/9'
  //               />
  //               {partsPath.map((part, index) => (
  //                 <Box
  //                   key={index}
  //                   component='span'
  //                   sx={{
  //                     typography: "caption",
  //                     color: part.highlight
  //                       ? "primary.main"
  //                       : "text.secondary",
  //                   }}
  //                 >
  //                   {part.text}
  //                 </Box>
  //               ))}
  //             </Box>
  //           </Grid>
  //         </Grid>
  //       );
  //     }}
  //   />
  // </Box>
};
