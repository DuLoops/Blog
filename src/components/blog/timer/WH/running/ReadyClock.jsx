import React from "react";
import { Box, Text } from "@chakra-ui/react";
export default function ReadyClock(props) {
  return (
    <Box h="50vh">
      <Box
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
      </Box>
    </Box>
  );
}
