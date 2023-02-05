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
      {/* <Box
        m="auto"
        border="10px white solid"
        borderRadius={"50%"}
        boxSize="300px"
        position={"relative"}
      >
        <Text
          fontSize={"3rem"}
          m="0"
          position={"absolute"}
          top="50%"
          left="50%"
          transform={"translate(-50%,-50%)"}
        >
          {props.duration - props.timer}
        </Text>
      </Box> */}
    </Box>
  );
}
