import React from "react";
import { Box, Icon, Button, Flex } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
export default function PauseClock(props) {
  return (
    <Flex flexDir="column">
      <Box
        m="auto"
        border="10px white solid"
        borderRadius={"50%"}
        boxSize="300px"
        position={"relative"}
      >
        <Icon
          fontSize={"3rem"}
          m="0"
          position={"absolute"}
          top="50%"
          left="50%"
          transform={"translate(-50%,-50%)"}
          as={FaPlay}
          boxSize="100px"
        />
      </Box>

        <Button
          mt="50px"
          w="100px"
          mx="auto"
          onClick={() => {
            props.setCurrentState("setting");
          }}
        >
          Exit
        </Button>
    </Flex>
  );
}
