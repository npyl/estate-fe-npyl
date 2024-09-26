import { Button, Skeleton, Stack } from "@mui/material";
import { useDispatch } from "src/store";
import { KeyValue } from "src/types/KeyValue";
import {
    ActionCreatorWithPayload,
    ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import ClearableSection from "./ClearableSection";

interface FieldSelectProps {
    title: string;
    values: string[];
    options: KeyValue[];
    onClick: ActionCreatorWithPayload<any, string>;
    onReset: ActionCreatorWithoutPayload<string>;
}

const FieldSelect = ({
    title,
    values,
    options,
    onClick,
    onReset,
}: FieldSelectProps) => {
    const dispatch = useDispatch();

    return (
        <ClearableSection title={title} reset={onReset}>
            <Stack direction="row" gap={1} flexWrap="wrap">
                {options.map((e) => (
                    <Button
                        variant={
                            values.includes(e.key) ? "contained" : "outlined"
                        }
                        color={"primary"}
                        key={e.key}
                        onClick={() => dispatch(onClick(e.key))}
                    >
                        {e.value}
                    </Button>
                ))}
                {options.length == 0 // If options is not available, display 3 Skeletons
                    ? Array.from(new Array(3)).map((_, index) => (
                          <Skeleton
                              key={index}
                              variant="rectangular"
                              width={100}
                              height={40}
                              sx={{
                                  borderRadius: "15px",
                              }}
                              animation="wave"
                          />
                      ))
                    : null}
            </Stack>
        </ClearableSection>
    );
};

export default FieldSelect;
