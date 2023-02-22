import {
  Box,
  Button,
  Link,
  Heading,
  HStack,
  Flex,
  VStack,
} from "@chakra-ui/react";
import WHSetting from "./setting/WHSetting";
import React from "react";
import WHInfoModal from "./WHInfoModal";

export default function WHLanding(props) {
  return (
    <Box textAlign={"center"} mt="20px">
      <Heading>Wim Hof</Heading>
      <Heading>Breathing Timer</Heading>
      <VStack gap={"20px"} my="30px">
        <HStack className="main">
          <WHInfoModal />
          <Button>
            <Link
              href="https://www.youtube.com/watch?v=IFSL_Qk9qKw&ab_channel=WimHof"
              target={"_blank"}
            >
              Safety Video
            </Link>
          </Button>
        </HStack>
        <WHSetting setting={props.setting} setSetting={props.setSetting} />
      </VStack>
      <Button
        mt="20px"
        mb='50px'
        onClick={() => {
          props.setCurrentState("running");
        }}
      >
        Start!
      </Button>
    </Box>
  );
}
