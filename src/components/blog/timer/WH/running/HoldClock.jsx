import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

export default function HoldClock(props) {
  return (
    <Box h="50vh">
      <CircularProgress
        value={props.timer}
        max={props.duration}
        color="white"
        trackColor="colors.dark[100]"
        thickness={'3px'}
        size="300px"
      >
        <CircularProgressLabel>
          {props.duration - props.timer}
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
}
