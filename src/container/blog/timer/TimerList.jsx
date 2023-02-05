import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const timerOptions = [
  ["WIM HOF Breathing", "wim-hof-timer"],
  ["Exercise", "exercise"],
  ["Custome", "custome"],
];

const colors = [
  "brandBlue.100",
  "brandYellow.100",
  "brandOrange.100",
  "brandRed.100",
  "brandGreen.300",
];

export default function TimerList() {
  return (
    <Flex
      w="100%"
      flexDir="column"
      textAlign={"center"}
      justifyContent={"center"}
    >
      <Box m="2rem">
        <Heading>UNIT</Heading>
        <Heading>Timer</Heading>
        <Text my="1rem" fontFamily={""}>
          Ultimate Notifying Interval Timer
        </Text>
      </Box>

      <Flex
        className="timers"
        flexDir="column"
        m="1rem"
        border="5px solid white"
        gap="10px"
        p="10px"
      >
        <Text> - Timer options - </Text>
        {timerOptions.map((timer, index) => (
          <Box bgColor={colors[index]} key={index}>
            <Link href={`${timer[1]}`} key={index} p="3px">
              {timer[0]}
            </Link>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
